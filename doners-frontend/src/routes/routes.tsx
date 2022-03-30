import BoardDetail from 'pages/Detail/BoardDetail/BoardDetail';
import ScrollLayout from 'layouts/ScrollLayout/ScrollLayout';
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
import EpilogueEditPage from 'pages/EditPage/Epilogue/EpilogueEditPage';
import EpilogueDetail from 'pages/Detail/EpilogueDetail/EpilogueDetail';

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
        // { path: 'list', element: <DonateListPage /> },
        { path: 'list/:category_id', element: <DonateListPage /> },
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
        { path: 'epilogue/:epilogue_id', element: <EpilogueDetail /> },
        { path: 'epilogue/write/:epilogue_id', element: <EpilogueEditPage /> },
        {
          path: 'epilogue/modify/:epilogue_id',
          element: <EpilogueEditPage modify />,
        },
        { path: 'board', element: <CommunityPage focus={3} /> },
        { path: 'board/:community_id', element: <BoardDetail /> },
        { path: 'board/write', element: <BoardEditPage /> },
        {
          path: 'board/modify/:community_id',
          element: <BoardEditPage modify />,
        },
        { path: 'about', element: <CommunityPage focus={4} /> },
      ],
    },
    // {
    //   path: '/detail',
    //   element: <ScrollLayout />,
    //   children: [{ path: ':epilouge_seq', element: <HomePage /> }],
    // },
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
