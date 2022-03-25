package com.doners.donersbackend.security.config;

import com.doners.donersbackend.security.service.UserDetailsServiceImpl;
import com.doners.donersbackend.security.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

// Security 설정을 위한 class 로 WebSecurityConfigurerAdapter 를 상속받음
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private UserDetailsServiceImpl userDetailsService;

	@Autowired
	private JwtAuthenticationProvider jwtAuthenticationProvider;

	@Autowired
	private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

	@Autowired
	private JwtAccessDeniedHandler jwtAccessDeniedHandler;

	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

	@Bean
	PasswordEncoder passwordEncoder() {
		return new NoPasswordEncoder();
	}

	// 인증 방법
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {

		http
				.httpBasic()
				.and()
				.cors()
				.and()
				.csrf().disable()
				// 토큰을 활용하면 세션이 필요 없으므로 STATELESS 로 설정
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
				.and()
				.exceptionHandling()
				.authenticationEntryPoint(jwtAuthenticationEntryPoint)
				.accessDeniedHandler(jwtAccessDeniedHandler)
				.and()
				// authorizeRequests() : HttpServletRequests 를 사용하는 요청들에 대한 접근 제한을 설정
				.authorizeRequests()
				// "/api/user" 에 대한 요청은 인증 없이 접근을 허용하겠다.
				.antMatchers("/api/user/**").permitAll()
				.antMatchers("/api/email/**").permitAll()
				.antMatchers("/swagger-ui/**").permitAll()
				.antMatchers("/api/v3/**", "/swagger-ui/**", "/swagger/**", "/swagger-resources/**", "/v3/api-docs").permitAll()
				.antMatchers("/api/user/image", "/api/user/mypage/**", "/api/user/nickname").authenticated()
				// 나머지 요청들은 모두 인증되어야 한다.
				.anyRequest().authenticated()
				.and()
				// JWT 필터 추가
				.addFilterBefore(new JwtAuthenticationFilter(jwtAuthenticationProvider),
						UsernamePasswordAuthenticationFilter.class);

	}

}
