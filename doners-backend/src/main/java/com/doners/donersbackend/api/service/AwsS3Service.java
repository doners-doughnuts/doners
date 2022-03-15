package com.doners.donersbackend.api.service;

import com.doners.donersbackend.db.entity.User;
import org.springframework.web.multipart.MultipartFile;

public interface AwsS3Service {
    void uploadProfileImage(MultipartFile multipartFile);

    String createFileName(String fileName);

    String getFileExtension(String fileName);

    String getThumbnailPath(User user);

    String getFilePath(String newFileName);
}
