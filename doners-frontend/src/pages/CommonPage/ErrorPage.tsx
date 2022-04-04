import ErrorContent from 'containers/Error/ErrorContent';

const ErrorPage = () => {
  return (
    <section>
      <ErrorContent
        errorcode={'500'}
        message={'서버에 문제가 발생하였습니다. \n 잠시 후 다시 시도해주세요.'}
      />
    </section>
  );
};

export default ErrorPage;
