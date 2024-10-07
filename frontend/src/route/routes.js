import About from '../pages/About';
import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import HabitCreate from '../pages/dashboard/HabitCreate';
import HabitsAqua from '../pages/dashboard/HabitsAqua';
import HabitsPage from '../pages/dashboard/HabitsPage';

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
    children: [
      {
        path: 'habits',
        element: HabitsPage,
      },
      {
        path: 'about',
        element: About,
      },
      {
        path: 'aqua',
        element: HabitsAqua,
      },
      {
        path: '',
        element: HabitsPage,
      },
    ],
  },
  {
    path: '/profile',
    element: Profile,
    exact: true,
  },
  {
    path: '/create',
    element: HabitCreate,
    exact: true,
  },
];

export default routes;
