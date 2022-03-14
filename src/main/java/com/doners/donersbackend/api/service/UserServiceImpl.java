package com.doners.donersbackend.api.service;

import com.doners.donersbackend.api.dto.UserNicknamePatchDto;
import com.doners.donersbackend.db.entity.User;
import com.doners.donersbackend.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Transactional
    @Override
    public Integer changeUserNickname(UserNicknamePatchDto userNicknamePatchDto) {
        // 추후 변경
        User user = userRepository.findByUserNickname("웅대디").orElse(null);
        if(user == null)
            return 409;

        try {
            user.changeNickname(userNicknamePatchDto.getUserNickname());
        } catch(Exception e) {
            e.printStackTrace();
            return 409;
        }

        return 200;
    }

}
