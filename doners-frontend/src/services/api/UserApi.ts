import instance from 'services/axios';

//const COMMON = '/user';

type SignUpValidationProps = {
  userAccount?: string;
  userCode?: string;
  userEmail?: string;
  userName?: string;
  userNickname?: string;
};

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
    localStorage.setItem('user', response.data.accessToken);
  }

  if (response.data.accessToken) {
    // save JWT token
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

/* 닉네임 중복검사 */
export const checkNickname = async (userNickname: any) => {
  try {
    const response = await instance.get(`/user/check/${userNickname}`);
    console.log(response);
    return response;
  } catch (error) {
    return false;
  }
};

export const signupcheck = async (dataSet: SignUpValidationProps) => {
  console.log('dataSet', dataSet);
  const response = await instance.post(`/user`, dataSet);
  console.log(response);
  return response;
};

/* 이메일 인증 메일 발송 */
export const emailSend = async (userEmail: any) => {
  const response = await instance.post(`/email`, { emailAddress: userEmail });
  console.log(response);
  return response;
};

/* 이메일 인증 완료 여부 확인 */
export const emailcheck = async (userEmail: any) => {
  const response = await instance.get(`/email/check/${userEmail}`);
  console.log(response);
  return response;
};

/* 유저 프로필 */
export const getUserProfile = async (nickname: string) => {
  const response = await instance.get(`/user/image/${nickname}`);
  console.log(response);
  return response;
};
