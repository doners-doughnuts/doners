package com.doners.donersbackend.db.entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class User extends BaseEntity {
    @Column(name="user_name")
    private String userName;

    @Column(name="user_nickname")
    private String userNickname;

    @Column(name="user_email")
    private String userEmail;

    @Column(name="user_account")
    private String userAccount;

    @Column(name="user_is_deleted", columnDefinition="BOOLEAN DEFAULT false")
    private boolean userIsDeleted;

    // 닉네임 수정
    public void changeNickname(String nickName) {
        this.userNickname = nickName;
    }

    // 회원 탈퇴
    public void deleteUser() {
        if(!this.userIsDeleted) {
            this.userIsDeleted = true;
        }
    }
}
