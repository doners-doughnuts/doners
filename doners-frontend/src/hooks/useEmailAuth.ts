import { useEffect, useState } from 'react';

type useFormProps = {
  initialValues: {
    email?: string; // 유저의 이름
  };
  onSubmit: (values: any) => any; // eslint-disable-line
  validate: any;
};

function useEmailAuth({ initialValues, onSubmit, validate }: useFormProps) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({
    email: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
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

export default useEmailAuth;
