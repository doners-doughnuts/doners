import { RecoilRoot } from 'recoil';
import Router from 'routes/routes';
import ScrollToTop from 'components/ScrollToTop/ScrollToTop';
import { ToastContainer } from 'react-toastify';

export default function App() {
  return (
    <>
      <RecoilRoot>
        <ScrollToTop />
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
