package com.doners.donersbackend.api.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.doners.donersbackend.db.entity.Image;
import com.doners.donersbackend.db.entity.User;
import com.doners.donersbackend.db.repository.ImageRepository;
import com.doners.donersbackend.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AwsS3ServiceImpl implements AwsS3Service {

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final AmazonS3Client amazonS3Client;

    private final ImageRepository imageRepository;

    private final UserRepository userRepository;

    @Override
    public void uploadProfileImage(MultipartFile multipartFile) {
        User user = userRepository.findByUserNickname("웅이2").orElseThrow(
                () -> new IllegalArgumentException("해당 닉네임을 찾을 수 없습니다."));

        String fileName = createFileName(multipartFile.getOriginalFilename());

        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(multipartFile.getSize());
        objectMetadata.setContentType(multipartFile.getContentType());

        try(InputStream inputStream = multipartFile.getInputStream()) {
            amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "프로필 사진 등록에 실패했습니다.");
        }

        Image image = imageRepository.findByUser(user).orElse(null);

        if(image == null) {
            image = Image.builder()
                    .imageOriginFileName(multipartFile.getOriginalFilename())
                    .imageNewFileName(fileName)
                    .user(user).build();
        } else {
            image.changeImage(multipartFile.getOriginalFilename(), fileName);
        }

        imageRepository.save(image);
    }

    @Override
    public String createFileName(String fileName) {
        return UUID.randomUUID().toString().concat(getFileExtension(fileName));
    }

    @Override
    public String getFileExtension(String fileName) {
        try {
            return fileName.substring(fileName.lastIndexOf("."));
        } catch (StringIndexOutOfBoundsException e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "잘못된 형식의 파일(" + fileName + ") 입니다.");
        }
    }

    @Override
    public String getThumbnailPath(User user) {
        Image image = imageRepository.findByUser(user).orElse(null);
        if(image == null)
            return null;
        else
            return amazonS3Client.getResourceUrl(bucket, image.getImageNewFileName());
    }

    @Override
    public String getFilePath(String newFileName) {
        return amazonS3Client.getResourceUrl(bucket, newFileName);
    }
}
