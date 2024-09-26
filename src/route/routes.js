import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';

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
];

export default routes;