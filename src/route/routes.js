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
  }
];

export default routes;