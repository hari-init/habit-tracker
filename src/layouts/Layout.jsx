import { Outlet } from 'react-router-dom';
import Header from '../components/layouts/Header';
import Footer from '../components/layouts/Footer';

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      {/* <Footer/> */}
    </>
  );
};

export default Layout;
