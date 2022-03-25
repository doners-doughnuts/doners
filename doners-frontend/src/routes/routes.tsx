import BoardDetail from 'pages/Detail/BoardDetail/BoardDetail';
import ScrollLayout from 'layouts/ScrollLayout/ScrollLayout';
import NavLayout from 'layouts/ScrollLayout/ScrollLayout';
import CommunityPage from 'pages/Community/CommunityPage';
import DonateCategoryPage from 'pages/Donate/DonateCategoryPage';
import DonateDetailPage from 'pages/Donate/DonateDetailPage';
import DonateListPage from 'pages/Donate/DonateListPage';
import DonateRegistPage from 'pages/Donate/DonateRegistPage';
import SignupPage from 'pages/SignupPage/SignupPage';
import HomePage from 'pages/HomePage/HomePage';
import MyPage from 'pages/MyPage/MyPage';
import Test from 'pages/Test/Test';

import { Navigate, useRoutes } from 'react-router';
import BoardEditPage from 'pages/EditPage/Board/BoardEditPage';

export default function Router() {
  return useRoutes([
    {
      path: '/signup',
      element: <ScrollLayout />,
      children: [{ path: '', element: <SignupPage /> }],
    },
    {
      path: '/category',
      element: <ScrollLayout />,
      children: [{ path: '', element: <DonateCategoryPage /> }],
    },
    {
      path: '/fundraisings',
      element: <ScrollLayout />,
      children: [
        { path: 'list', element: <DonateListPage /> },
        { path: 'apply', element: <DonateRegistPage /> },
        { path: ':donate_seq', element: <DonateDetailPage /> },
      ],
    },
    {
      path: '/profile',
      element: <ScrollLayout />,
      children: [{ path: ':nickname', element: <MyPage /> }],
    },
    {
      path: '/community',
      element: <ScrollLayout />,
      children: [
        // { path: '', element: <Test />},
        { path: '', element: <Navigate to="membership" replace /> },
        { path: 'membership', element: <CommunityPage focus={1} /> },
        { path: 'epilogue', element: <CommunityPage focus={2} /> },
        { path: 'board', element: <CommunityPage focus={3} /> },
        { path: 'board/:post_seq', element: <BoardDetail /> },
        { path: 'board/write', element: <BoardEditPage /> },
        { path: 'about', element: <CommunityPage focus={4} /> },
      ],
    },
    {
      path: '/detail',
      element: <ScrollLayout />,
      children: [{ path: ':epilouge_seq', element: <HomePage /> }],
    },
    {
      path: '/admin',
      element: <ScrollLayout />,
      children: [{ path: '', element: <HomePage /> }],
    },
    {
      path: '/',
      element: <ScrollLayout />,
      children: [{ path: '/', element: <HomePage /> }],
    },
    // { path: '*', element: <Navigate to="/error" replace /> },
    { path: '*', element: <Test /> },
  ]);
}
