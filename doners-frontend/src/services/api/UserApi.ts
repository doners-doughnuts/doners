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
  const user = {
    accessToken: response.data.accessToken,
    nickName: response.data.userNickname,
  };
  sessionStorage.setItem('user', JSON.stringify(user));

  /* 관리자 계정 검사 */
  if (response.data.userCode === 'ADMIN')
    sessionStorage.setItem('isAdmin', JSON.stringify(true));
  else sessionStorage.removeItem('isAdmin');
};

/* 닉네임 중복검사 */
export const checkNickname = async (userNickname: string) => {
  // try {
  const response = await instance.get(`/user/check/${userNickname}`);
  return response;
  // } catch (error) {
  //   return false;
  // }
};

export const signup = async (body: SignUpValidationProps) => {
  const response = await instance.post(`/user`, body);
  return response;
};

/* 이메일 인증 메일 발송 */
export const emailSend = async (userEmail: string) => {
  const response = await instance.post(`/email`, { emailAddress: userEmail });
  return response;
};

/* 이메일 인증 완료 여부 확인 */
export const emailcheck = async (userEmail: string) => {
  const response = await instance.get(`/email/check/${userEmail}`);
  return response;
};

/* 유저 프로필 */
export const getUserProfile = async (nickname: string) => {
  const response = await instance.get(`/user/image/${nickname}`);
  return response;
};

/* 유저 프로필사진 수정 */
export const postProfile = async (formData: any) => {
  const response = await instance.post(`/user/image`, formData);
  return response;
};

/* 유저 이름 불러오기 */
export const getUserName = async (nickname: string) => {
  const response = await instance.get(`/user/name/${nickname}`);
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
