//* Get Logged User info from sessionStorage

export function getLoggedUserId() {
  const user = sessionStorage.getItem('accessToken');
  if (user) {
    return user;
  } else {
  }
}

/* 로그인 상태인지 검사해주는 hook */
export function checkUserLogged() {
  console.log('사용자 로그인 여부:', getLoggedUserId() !== undefined);
  return getLoggedUserId() !== undefined;
}

export function getLoggedUserInfo() {
  const user = sessionStorage.getItem('accessToken');
  return user;
}
