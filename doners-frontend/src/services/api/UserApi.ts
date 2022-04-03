import instance from 'services/axios';

//const COMMON = '/user';

type SignUpValidationProps = {
  userAccount?: string;
  userCode?: string;
  userEmail?: string;
  userName?: string;
  userNickname?: string;
};

export const login = async (userAccount: string) => {
  const response = await instance.get(`/user/${userAccount}`);
  // 아직 JWT TOKEN없어서

  // if (response.data.accessToken) {
  //   // save JWT token
  sessionStorage.setItem(
    'accessToken',
    JSON.stringify(response.data.accessToken)
  );
  // }
  // return response.data;
};

/* 닉네임 중복검사 */
export const checkNickname = async (userNickname: string) => {
  try {
    const response = await instance.get(`/user/check/${userNickname}`);
    return response;
  } catch (error) {
    return false;
  }
};

export const signup = async (body: SignUpValidationProps) => {
  console.log('dataSet', body);
  const response = await instance.post(`/user`, body);
  console.log(response);
  return response;
};

/* 이메일 인증 메일 발송 */
export const emailSend = async (userEmail: string) => {
  const response = await instance.post(`/email`, { emailAddress: userEmail });
  console.log(response);
  return response;
};

/* 이메일 인증 완료 여부 확인 */
export const emailcheck = async (userEmail: string) => {
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
