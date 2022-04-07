package com.doners.donersbackend;

import com.doners.donersbackend.application.service.CommunityService;
import com.doners.donersbackend.application.service.UserService;
import com.doners.donersbackend.domain.dao.user.User;
import com.doners.donersbackend.domain.enums.CategoryCode;
import com.doners.donersbackend.domain.enums.UserCode;
import com.doners.donersbackend.domain.repository.UserRepository;
import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Profile;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.web.servlet.MockMvc;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Transactional
@SpringBootTest
@Rollback(value=false)
@AutoConfigureMockMvc
class DonersBackendApplicationTests {

//	@Autowired
//	UserRepository userRepository;
//
//	@Autowired
//	MockMvc mockMvc;
//
//	@MockBean
//	UserService userService;
//
//	@MockBean
//	CommunityService communityService;

	@Test
	@DisplayName("커뮤니티 리스트를 반환하면 성공")
	@WithUserDetails(value="0x123456789")
	void contextLoads() throws Exception {
//		mockMvc.perform(get("/api/community/list/1"))
//				.andExpect(status().isOk());

	}

//	@PostConstruct
//	@Profile("dev")
//	public void settingUserTest() {
//		User user = User.builder()
//				.
//	}

	@Test
	void jasypt() {

	}

	public String jasyptEncoding(String value) {
		String key = "doners-jasypt";
		StandardPBEStringEncryptor pbeEnc = new StandardPBEStringEncryptor();
		pbeEnc.setAlgorithm("PBEWithMD5AndDES");
		pbeEnc.setPassword(key);
		return pbeEnc.encrypt(value);
	}

}
