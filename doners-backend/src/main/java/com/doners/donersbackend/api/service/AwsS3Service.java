package com.doners.donersbackend.api.service;

import com.doners.donersbackend.db.entity.User;
import org.springframework.web.multipart.MultipartFile;

import java.awt.image.BufferedImage;
import java.io.IOException;

public interface AwsS3Service {
    void uploadProfileImage(MultipartFile multipartFile);

    String createFileName(String fileName);

    String getFileExtension(String fileName);

    String getThumbnailPath(User user);

    BufferedImage createThumbnail(MultipartFile profileImage, int thumbWidth, int thumbHeight) throws IOException;

    String getFilePath(String newFileName);
}
