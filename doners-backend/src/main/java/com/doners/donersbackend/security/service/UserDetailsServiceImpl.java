package com.doners.donersbackend.security.service;

import com.doners.donersbackend.domain.dao.user.User;
import com.doners.donersbackend.domain.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

// 인증에 필요한 UserDetailsService Interface 의 loadUserByUsername 메서드를 구현하는 클래스로
// loadUserByUsername 메서드를 통해 Database 에 접근하여 사용자 정보를 가지고 옴
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String userAccount) throws UsernameNotFoundException {

		Optional<User> oUser = userRepository.findByUserAccount(userAccount);

		return new UserDetailsImpl(oUser.orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다.")));

	}

}
