type SignUpValidationProps = {
  realname?: string;
  authmail?: string;
  nickname?: string;
  email?: string;
};

const kOREAN_ENGLISH_REGEX = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|]+$/;
const nICKNAME_REGEX = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;
const emailRegex =
  /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

export default function SignUpValidation({
  realname,
  nickname,
  authmail,
  email,
}: SignUpValidationProps) {
  const errors: SignUpValidationProps = {};

  if (!realname) {
    errors.realname = '이름이 입력되지 않았습니다.';
  }

  if (!nickname) {
    errors.nickname = '닉네임이 입력되지 않았습니다.';
  } else if (!nICKNAME_REGEX.test(nickname)) {
    errors.nickname = '닉네임을 올바르게 입력해주세요.';
  }

  if (!email) {
    errors.email = '이메일이 입력되지 않았습니다.';
  } else if (!emailRegex.test(email)) {
    errors.email = '이메일 형식이 올바르지 않습니다.';
  }

  return errors;
}

//   const nickvali = async (nickname: any) => {
//     try {
//       console.log('닉네임 중복확인');
//       const response = await checkNickname(nickname);
//       console.log(response);
//       return true;
//     } catch (error) {
//       console.log('에러!');
//       errors.nickname = '중복된 닉네임!!!!! 입니다.';
//       return true;
//     }
//   };

//   const emailvalicheck = (email: any) => {
//     try {
//       const response = emailcheck(email);
//       console.log(response);
//     } catch (error) {
//       console.log('error emailcheck');
//       return false;
//     }
//   };

//   if (!realname) {
//     errors.realname = '이름을 입력해주세요.';
//   } else if (realname.length < 2) {
//     errors.realname = '2자 이상의 이름을 입력해주세요.';
//   } else if (realname.length > 10) {
//     errors.realname = '10자 이하의 이름을 입력해주세요.';
//   } else if (!kOREAN_ENGLISH_REGEX.test(realname)) {
//     errors.realname = '한글과 영어로만 가능합니다.';
//   }

//   if (!nickname) {
//     errors.nickname = '닉네임을 입력해주세요.';
//   } else if (nickname.length < 2) {
//     errors.nickname = '2자 이상의 닉네임을 사용해야 합니다.';
//   } else if (nickname.length > 10) {
//     errors.nickname = '10자 이하의 닉네임을 사용해야 합니다.';
//   } else if (!nICKNAME_REGEX.test(nickname)) {
//     errors.nickname = '특수기호는 불가능합니다.';
//   } else if (!nickvali(nickname)) {
//     errors.nickname = '중복된 닉네임!! 입니다.';
//   }

//   if (!authmail) {
//     errors.authmail = '이메일 인증을 해주세요.';
//   } else {
//     //이메일 인증이 전송된 상태
//     if (!email) {
//       errors.authmail = '이메일 인증을 완료해주세요.';
//     }
//   }

//   return errors;
// }
function getPromise() {
  throw new Error('Function not implemented.');
}
