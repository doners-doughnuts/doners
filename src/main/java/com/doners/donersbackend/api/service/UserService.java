package com.doners.donersbackend.api.service;

import com.doners.donersbackend.api.dto.UserNicknamePatchDto;

import javax.transaction.Transactional;

public interface UserService {

    @Transactional
    Integer changeUserNickname(UserNicknamePatchDto usernicknamePatchDto);
}
