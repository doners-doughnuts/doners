import { RecoilRoot } from 'recoil';
import Router from 'routes/routes';
// TODO
// import styles from './App.module.css';
import ScrollToTop from 'components/ScrollToTop/ScrollToTop';
import Web3Test from 'services/Web3Test';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { getNotificationList } from 'services/api/NotificationApi';

export default function App() {
  // const getUserNotificationList = async () => {
  //   const response = await getNotificationList();

  //   // setNotifications(response.data);
  // };

  // useEffect(() => {
  //   getUserNotificationList();
  // }, []);
  return (
    <>
      {/* <ScrollToTop />
     <GlobalStyles /> */}
      {/* Recoil을 사용하는 component들은 <RecoilRoot>로 감싸야 함 */}
      <RecoilRoot>
        <ScrollToTop />
        {/* <Web3Test /> */}
        <Router />
      </RecoilRoot>
      <ToastContainer
        position="top-center"
        pauseOnFocusLoss
        draggable
        pauseOnHover
        autoClose={2000}
      />
    </>
  );
}
