package com.doners.donersbackend;

import com.doners.donersbackend.db.repository.UserRepository;
import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;
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
//		User user = User.builder()
//				.userName("손창현")
//				.userNickname("웅대디")
//				.userEmail("gganzii1215@gmail.com")
//				.userAccount(null).build();
//
//		userRepository.save(user);
//
//		User user1 = userRepository.findByUserEmail("gganzii1215@gmail.com").get();
//
//		System.out.println(user1);
	}

	@Test
	void jasypt() {
		String url = "jdbc:mysql://localhost:3306/doners_db?useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Seoul&zeroDateTimeBehavior=convertToNull&rewriteBatchedStatements=true";
		String username = "doners";
		String userpassword = "doners404!";

		String accessKey = "AKIAQDKVAN6PYQY6CTWQ";
		String secretKey = "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";
		String bucket = "donersa404";
		String region = "ap-northeast-2";

		System.out.println(jasyptEncoding(url));
		System.out.println(jasyptEncoding(username));
		System.out.println(jasyptEncoding(userpassword));
		System.out.println();
		System.out.println(jasyptEncoding(accessKey));
		System.out.println(jasyptEncoding(secretKey));
		System.out.println(jasyptEncoding(bucket));
		System.out.println(jasyptEncoding(region));
	}

	public String jasyptEncoding(String value) {
		String key = "doners-jasypt";
		StandardPBEStringEncryptor pbeEnc = new StandardPBEStringEncryptor();
		pbeEnc.setAlgorithm("PBEWithMD5AndDES");
		pbeEnc.setPassword(key);
		return pbeEnc.encrypt(value);
	}

}
