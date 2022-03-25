import { useEffect, useState } from 'react';

type useFormProps = {
  initialValues: {
    realname?: string; // 유저의 이름
    nickname: string; //유저의 닉네임
    authmail?: boolean;
    email?: string;
  };
  onSubmit: (values: any) => any; // eslint-disable-line
  validate: any;
};

function useForm({ initialValues, onSubmit, validate }: useFormProps) {
  let sendEmailFlag = false;
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({
    nickname: '',
    authmail: '',
    realname: '',
    email: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log('handleChange');

    if (name === 'email') {
      setErrors({ ...errors, authmail: '' });
    } else if (event.target.type === 'button') {
      sendEmailFlag = true;
      setErrors({ ...errors, authmail: '' });
      setValues({ ...values, authmail: true });
    } else {
      setErrors({ ...errors, [name]: '' });
    }
    setValues({ ...values, [name]: value });
    if (sendEmailFlag) {
      setValues({ ...values, authmail: true });
    }
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    setIsLoading(true);

    event.preventDefault();
    await new Promise((r) => setTimeout(r, 1000));
    setErrors(validate(values));
  };

  useEffect(() => {
    if (isLoading) {
      if (Object.keys(errors).length === 0) {
        onSubmit(values);
      }
      setIsLoading(false);
    }
  }, [errors, isLoading, onSubmit, values]);

  return {
    values,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
  };
}

export default useForm;
