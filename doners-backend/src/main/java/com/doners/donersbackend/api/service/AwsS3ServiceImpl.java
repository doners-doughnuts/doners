package com.doners.donersbackend.api.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.doners.donersbackend.db.entity.Image;
import com.doners.donersbackend.db.entity.User;
import com.doners.donersbackend.db.entity.donation.Donation;
import com.doners.donersbackend.db.entity.donation.File;
import com.doners.donersbackend.db.repository.FileRepository;
import com.doners.donersbackend.db.repository.ImageRepository;
import com.doners.donersbackend.db.repository.UserRepository;
import com.mortennobel.imagescaling.AdvancedResizeOp;
import com.mortennobel.imagescaling.MultiStepRescaleOp;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AwsS3ServiceImpl implements AwsS3Service {

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final AmazonS3Client amazonS3Client;

    private final ImageRepository imageRepository;

    private final FileRepository fileRepository;

    private final UserRepository userRepository;

    @Override
    public String uploadImage(MultipartFile multipartFile) {

        String fileName = createFileName(multipartFile.getOriginalFilename());

        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(multipartFile.getSize()); // bytes
        objectMetadata.setContentType(multipartFile.getContentType());

        try(InputStream inputStream = multipartFile.getInputStream()) {
            amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "사진 등록에 실패했습니다.");
        }

        return fileName;
    }

    @Override
    public String uploadThumbnailImage(String fileName, MultipartFile multipartFile) {

        String thumbnailFileName = "resized_" + fileName;
        try {
            BufferedImage bufferedImage = createThumbnail(multipartFile, 300, 300);

            ByteArrayOutputStream os = new ByteArrayOutputStream();
            ImageIO.write(bufferedImage, "png", os);

            byte[] buffer = os.toByteArray();
            InputStream thumbnailImageInputStream = new ByteArrayInputStream(buffer);

            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentLength(buffer.length);
            objectMetadata.setContentType("image/png");

            amazonS3Client.putObject(new PutObjectRequest(bucket, thumbnailFileName, thumbnailImageInputStream, objectMetadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "썸네일 사진 등록에 실패했습니다.");
        }

        return thumbnailFileName;
    }

    @Override
    public void uploadMyFile(Donation donation, MultipartFile image, List<MultipartFile> evidence) {

        if (image != null) {
            String fileName = createFileName(image.getOriginalFilename());

            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentLength(image.getSize());
            objectMetadata.setContentType(image.getContentType());

            try (InputStream inputStream = image.getInputStream()) {
                amazonS3Client.putObject(
                        new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
                                .withCannedAcl(CannedAccessControlList.PublicRead)
                );
            } catch (IOException e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "기부 신청글 대표 사진 업로드에 실패했습니다.");
            }

            Image img = Image.builder()
                    .imageOriginFileName(image.getOriginalFilename())
                    .imageNewFileName(fileName)
                    .donation(donation)
                    .build();

            imageRepository.save(img);
        }

        evidence.forEach(file -> {
            String fileName = createFileName(file.getOriginalFilename());

            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentLength(file.getSize());
            objectMetadata.setContentType(file.getContentType());

            try (InputStream inputStream = file.getInputStream()) {
                amazonS3Client.putObject(
                        new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
                                .withCannedAcl(CannedAccessControlList.PublicRead)
                );
            } catch (IOException e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "증빙 자료 업로드에 실패했습니다.");
            }

            File evidenceFile = File.builder()
                    .originalFileName(file.getOriginalFilename())
                    .savedFileName(fileName)
                    .donation(donation)
                    .build();

            fileRepository.save(evidenceFile);
        });

    }

    @Override
    public void uploadDeputyFile(Donation donation, MultipartFile certificate, MultipartFile image, List<MultipartFile> evidence) {

        String fileName = createFileName(certificate.getOriginalFilename());

        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(certificate.getSize());
        objectMetadata.setContentType(certificate.getContentType());

        try (InputStream inputStream = certificate.getInputStream()) {
            amazonS3Client.putObject(
                    new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
                            .withCannedAcl(CannedAccessControlList.PublicRead)
            );
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "관계 증명서 업로드에 실패했습니다.");
        }

        File certificateFile = File.builder()
                .originalFileName(certificate.getOriginalFilename())
                .savedFileName(fileName)
                .donation(donation)
                .build();

        fileRepository.save(certificateFile);

        uploadMyFile(donation, image, evidence);

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
    public BufferedImage createThumbnail(MultipartFile profileImage, int thumbWidth, int thumbHeight) {
        try {
            InputStream in = profileImage.getInputStream();
            BufferedImage originalImage = ImageIO.read(in);

            MultiStepRescaleOp rescale = new MultiStepRescaleOp(thumbWidth, thumbHeight);
            rescale.setUnsharpenMask(AdvancedResizeOp.UnsharpenMask.Soft);

            BufferedImage thumbImage = rescale.filter(originalImage, null);
            in.close();

            return thumbImage;
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "파일 리사이즈에 실패했습니다.");
        }
    }

    @Override
    public String getFilePath(String newFileName) {
        return amazonS3Client.getResourceUrl(bucket, newFileName);
    }
}
