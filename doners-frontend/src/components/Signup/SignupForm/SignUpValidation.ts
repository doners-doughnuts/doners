type SignUpValidationProps = {
  realname?: string;
  authmail?: string;
  nickname?: string;
};

const kOREAN_ENGLISH_REGEX = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|]+$/;
const nICKNAME_REGEX = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;
export default function SignUpValidation({
  realname,
  nickname,
  authmail,
}: SignUpValidationProps) {
  const errors: SignUpValidationProps = {};

  if (!realname) {
    errors.realname = '이름을 입력해주세요.';
  } else if (realname.length < 2) {
    errors.realname = '2자 이상의 이름을 입력해주세요.';
  } else if (realname.length > 10) {
    errors.realname = '10자 이하의 이름을 입력해주세요.';
  } else if (!kOREAN_ENGLISH_REGEX.test(realname)) {
    errors.realname = '한글과 영어로만 가능합니다.';
  }
  if (!nickname) {
    errors.nickname = '닉네임을 입력해주세요.';
  } else if (nickname.length < 2) {
    errors.nickname = '2자 이상의 닉네임을 사용해야 합니다.';
  } else if (nickname.length > 10) {
    errors.nickname = '10자 이하의 닉네임을 사용해야 합니다.';
  } else if (!nICKNAME_REGEX.test(nickname)) {
    errors.nickname = '특수기호는 불가능합니다.';
  }

  if (!authmail) {
    errors.authmail = '이메일 인증을 해주세요.';
  }

  return errors;
}
