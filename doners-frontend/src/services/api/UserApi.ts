import instance from 'services/axios';

//const COMMON = '/user';

export const login = async (userAccount: any) => {
  console.log(userAccount);
  const response = await instance.get(`/user/${userAccount}`, {
    params: {
      userAccount: userAccount,
    },
  });
  console.log(response);
  // 아직 JWT TOKEN없어서
  if (response.data.statusCode === 200) {
    localStorage.setItem('user', userAccount);
  }

  if (response.data.accessToken) {
    // save JWT token
    // localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

/* 닉네임 중복검사 */
export const checkNickname = async (userNickname: any) => {
  const response = await instance.get(`/user/check/${userNickname}`, {
    params: {
      userNickname: userNickname,
    },
  });
  console.log('??');
  return response;
};

export const signupcheck = async (
  username: any,
  useremail: any,
  useraccount: any,
  usernickname: any
) => {
  const dataset = {
    userAccount: useraccount,
    userEmail: useremail,
    userName: username,
    userNickname: usernickname,
  };
  const response = await instance.post(`/user`, dataset);
  console.log(response);
  return response;
};

/* 이메일 인증 메일 발송 */
export const emailConfirm = async (userEmail: any) => {
  const response = await instance.post(`/email/${userEmail}`, {
    params: {
      userEmail: userEmail,
    },
  });
  console.log(response.data);
  return response.data;
};

/* 이메일 인증 완료 여부 확인 */
export const emailcheck = async (userEmail: any) => {
  const response = await instance.get(`/email/check/email/${userEmail}`, {
    params: {
      userEmail: userEmail,
    },
  });
  console.log(response.data);
  return response.data;
};

// /* 회원 정보 불러오기 */
// export const getUserInfo = async (userId: any) => {
//   const response = await instance.get(COMMON + '/info' + `/${userId}`, {
//     profileUserId: userId,
//     loginUserId: getLoggedUserId(),
//   });
//   return response.data;
// };
