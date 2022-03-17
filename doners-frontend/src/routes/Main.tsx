import Footer from 'components/common/Footer';
import { Outlet } from 'react-router-dom';
import Navigator from '../components/common/Header';
const Main = () => {
  return (
    <>
      <Navigator />
      <Outlet />
      <Footer />
    </>
  );
};

export default Main;
