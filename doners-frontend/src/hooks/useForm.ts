import { useEffect, useState } from 'react';

type useFormProps = {
  initialValues: {
    realname: string; // 유저의 이름
    nickname: string; //유저의 닉네임
    email: string;
  };
  onSubmit: (values: any) => any; // eslint-disable-line
  validate: any;
};

function useForm({ initialValues, onSubmit, validate }: useFormProps) {
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
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setIsLoading(true);
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
