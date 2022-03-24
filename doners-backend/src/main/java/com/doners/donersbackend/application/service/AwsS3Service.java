package com.doners.donersbackend.application.service;

import com.doners.donersbackend.domain.dao.User;
import org.springframework.web.multipart.MultipartFile;

import java.awt.image.BufferedImage;
import java.io.IOException;

public interface AwsS3Service {

    String uploadImage(MultipartFile multipartFile);

    String uploadThumbnailImage(String fileName, MultipartFile multipartFile);

    String uploadFile(MultipartFile certificate);

    String createFileName(String fileName);

    String getFileExtension(String fileName);

    String getThumbnailPath(User user);

    BufferedImage createThumbnail(MultipartFile profileImage, int thumbWidth, int thumbHeight) throws IOException;

    String getFilePath(String newFileName);

}
