import About from '../pages/About';
import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';
import Profile from '../pages/Profile';

const routes = [
  {
    path: '/',
    element: Home,
    exact: true,
  },
  {
    path: '/dashboard',
    element: Dashboard,
    protected: true,
  },
  {
    path:'/profile',
    element: Profile,
    exact: true
  },
  {
    path:'/about',
    element: About,
    exact: true
  },

];

export default routes;