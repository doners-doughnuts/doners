type EmailAuthValidationProps = {
  realname?: string;
  email?: string;
  nickname?: string;
};

export default function EmailAuthValidation({
  email,
}: EmailAuthValidationProps) {
  const errors: EmailAuthValidationProps = {};

  if (!email) {
    errors.email = '이메일이 입력되지 않았습니다.~';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = '입력된 이메일이 유효하지 않습니다.';
  }

  return errors;
}
