import { RecoilRoot } from 'recoil';
import Router from 'routes/routes';
// TODO
// import styles from './App.module.css';
import ScrollToTop from 'components/ScrollToTop/ScrollToTop';
import Web3Test from 'services/Web3Test';
import { ToastContainer } from 'react-toastify';
import { getSSFBalance } from 'services/blockchain/SsfApi';
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    getSSFBalance('0xb72207EB8c21c7698d493Da3bB273F6C8a76E367');
  }, []);
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
