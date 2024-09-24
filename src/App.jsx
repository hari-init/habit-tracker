import './App.css';
import Layout from './layouts/Layout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routes from './routes';

const App = () => {
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
