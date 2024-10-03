import './App.css';
import Layout from './layouts/Layout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routes from './route/routes';
import { useDispatch, useSelector } from 'react-redux';
import { isAuthenticated } from './store/authSlice';
import { useEffect } from 'react';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(isAuthenticated());
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Layout />}>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={<route.element />}
                exact={route.exact}
              />
            ))}
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
