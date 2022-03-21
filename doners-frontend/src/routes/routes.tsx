import { Header } from 'components';
import ScrollLayout from 'layouts/ScrollLayout/ScrollLayout';
import NavLayout from 'layouts/ScrollLayout/ScrollLayout';
import CommunityPage from 'pages/Community/CommunityPage';
import CommunityRegistPage from 'pages/Community/CommunityRegistPage';
import DonateCategoryPage from 'pages/Donate/DonateCategoryPage';
import DonateDetailPage from 'pages/Donate/DonateDetailPage';
import DonateListPage from 'pages/Donate/DonateListPage';
import DonateRegistPage from 'pages/Donate/DonateRegistPage';
import HomePage from 'pages/HomePage/HomePage';
import MyPage from 'pages/MyPage/MyPage';

import { Navigate, useRoutes } from 'react-router';

export default function Router() {
  return useRoutes([
    {
      path: '/signup',
      element: <ScrollLayout />,
      children: [
        { path: '', element: <HomePage /> }
      ]
    },
    {
      path: '/category',
      element: <ScrollLayout />,
      children: [
        { path: '', element: <DonateCategoryPage /> }
      ]
    },
    {
      path: '/fundraisings',
      element: <ScrollLayout />,
      children: [
        { path: 'list', element: <DonateListPage /> },
        { path: 'apply', element: <DonateRegistPage /> },
        { path: ':donate_seq', element: <DonateDetailPage /> },
      ]
    },
    {
      path: '/profile',
      element: <ScrollLayout />,
      children: [
        { path: ':nickname', element: <MyPage /> }
      ]
    },
    {
      path: '/community',
      element: <ScrollLayout />,
      children: [
        { path: 'membership', element: <CommunityPage focus={1} /> },
        { path: 'epilogue', element: <CommunityPage focus={2} /> },
        { path: 'board', element: <CommunityPage focus={3} /> },
        { path: 'board/:post_seq', element: <CommunityPage focus={3} /> },
        { path: 'board/write', element: <CommunityRegistPage /> },
        { path: 'about', element: <CommunityPage focus={4} /> },
      ]
    },
    {
      path: '/detail',
      element: <ScrollLayout />,
      children: [
        { path: ':epilouge_seq', element: <HomePage /> }
      ]
    },
    {
      path: '/admin',
      element: <ScrollLayout />,
      children: [
        { path: '', element: <HomePage /> }
      ]
    },
    {
      path: '/',
      element: <ScrollLayout />,
      children: [
        { path: '/', element: <HomePage /> }
      ]
    },
    { path: '*', element: <Navigate to="/error" replace /> },
  ])
};