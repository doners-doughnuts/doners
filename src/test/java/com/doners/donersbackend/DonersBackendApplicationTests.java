package com.doners.donersbackend;

import com.doners.donersbackend.db.entity.User;
import com.doners.donersbackend.db.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;

import javax.transaction.Transactional;

@Transactional
@SpringBootTest
@Rollback(value=false)
class DonersBackendApplicationTests {

	@Autowired
	UserRepository userRepository;

	@Test
	void contextLoads() {
		User user = User.builder()
				.userName("손창현")
				.userNickname("웅대디")
				.userEmail("gganzii1215@gmail.com")
				.userAccount(null).build();

		userRepository.save(user);

		User user1 = userRepository.findByUserEmail("gganzii1215@gmail.com").get();

		System.out.println(user1);
	}

}
