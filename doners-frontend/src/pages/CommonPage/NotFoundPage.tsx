import ErrorContent from 'containers/Error/ErrorContent';

const NotFoundPage = () => {
  return (
    <section>
      <ErrorContent errorcode="404" message="페이지를 찾을 수 없습니다." />
    </section>
  );
};

export default NotFoundPage;
