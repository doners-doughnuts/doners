import instance from 'services/axios';

const COMMON = '/user';

type SignUpValidationProps = {
  userAccount?: string;
  userCode?: string;
  userEmail?: string;
  userName?: string;
  userNickname?: string;
};

export const login = async (userAccount: string) => {
  const response = await instance.get(`/user/${userAccount}`);
  console.log(response);
  const user = {
    accessToken: response.data.accessToken,
    nickName: response.data.userNickname,
  };
  sessionStorage.setItem('user', JSON.stringify(user));
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
  // console.log(response);
  return response;
};

/* 유저 프로필사진 수정 */
export const postProfile = async (formData: any) => {
  const response = await instance.post(`/user/image`, formData);
  // console.log(response);
  return response;
};

/* 유저 이름 불러오기 */
export const getUserName = async (nickname: string) => {
  const response = await instance.get(`/user/name/${nickname}`);
  //console.log(response);
  return response;
};

/* 유저 프로필 닉네임 수정 */
export const patchNickname = async (nickname: string) => {
  const response = await instance.patch(`/user/nickname`, {
    userNickname: nickname,
  });
  const user = sessionStorage.getItem('user');
  if (user) {
    const Juser = JSON.parse(user);
    const Nuser = {
      accessToken: Juser.accessToken,
      nickName: nickname,
    };
    sessionStorage.removeItem('user');
    sessionStorage.setItem('user', JSON.stringify(Nuser));
  }
  return response;
};

/* 사용자 지갑 주소 */
export const getUserAddress = async (nickname: string) => {
  const response = await instance.get(COMMON + `/account/${nickname}`);
  // console.log(response);
  return response;
};

/* 사용자 기부 신청 목록 조회 */
export const getUserApplicationList = async () => {
  const response = await instance.get(COMMON + '/mypage/donation');
  return response;
};
