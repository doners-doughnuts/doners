import Header from 'components/common/Header';
import HomePage from 'pages/HomePage/HomePage';
import { Navigate, useRoutes } from 'react-router';

const Router = () => {
  return useRoutes([
    {
      path: '/main',
      element: <Header />,
      children: [
        { element: <Navigate to="/main" replace /> },
        { path: '', element: <HomePage /> },
      ],
    },

    {
      path: '/',
      element: <Header />,
      children: [{ path: '404' }],
    },
  ]);
};

export default Router;
