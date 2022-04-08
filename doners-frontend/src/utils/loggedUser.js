//* Get Logged User info from sessionStorage

export function getLoggedUserId() {
  const user = sessionStorage.getItem('user');
  if (user) {
    return user;
  } else {
  }
}

/* 로그인 상태인지 검사해주는 hook */
export function checkUserLogged() {
  return getLoggedUserId() !== undefined;
}

export function getLoggedUserInfo() {
  const user = sessionStorage.getItem('user');
  return user;
}

/* sessionStorage에서 로그인된 nickname 가져오기 */
export function getLoggedUserNickname() {
  const user = sessionStorage.getItem('user');
  if (user) {
    // console.log(JSON.parse(user).nickName);
    return JSON.parse(user).nickName;
  }
}

/* 관리자 account 검사 */
export function isAdmin() {
  const isAdmin = sessionStorage.getItem('isAdmin');
  // console.log(isAdmin ? true : false)
  return isAdmin ? true : false;
  // if (isAdmin) {
  //   console.log('ADMIN ACCOUNT');
  //   return true;
  // } else
}
