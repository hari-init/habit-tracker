import { Outlet } from 'react-router-dom';
import Header from '../components/layouts/Header';
import Footer from '../components/layouts/Footer';

const Layout = () => {
  return (
    <>
      <Header />
      <div className='h-full pt-16'>
      <Outlet />
      </div>
      <Footer/> 
    </>
  );
};

export default Layout;
