package com.doners.donersbackend.api.service;

import com.doners.donersbackend.db.entity.User;
import com.doners.donersbackend.db.entity.donation.Donation;
import org.springframework.web.multipart.MultipartFile;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.List;

public interface AwsS3Service {
//    void uploadProfileImage(MultipartFile multipartFile);
    String uploadImage(MultipartFile multipartFile);

//    String uploadThumbnailImage(MultipartFile multipartFile);

    String uploadThumbnailImage(String fileName, MultipartFile multipartFile);

    void uploadMyFile(Donation donation, MultipartFile image, List<MultipartFile> evidence);

    void uploadDeputyFile(Donation donation, MultipartFile certificate, MultipartFile image, List<MultipartFile> evidence);

    String createFileName(String fileName);

    String getFileExtension(String fileName);

    String getThumbnailPath(User user);

    BufferedImage createThumbnail(MultipartFile profileImage, int thumbWidth, int thumbHeight) throws IOException;

    String getFilePath(String newFileName);
}
