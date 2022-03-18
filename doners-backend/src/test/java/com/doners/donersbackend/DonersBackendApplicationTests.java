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

	}

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
