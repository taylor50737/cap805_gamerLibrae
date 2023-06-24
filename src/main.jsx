import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';

import App from './App';
import AdminPanel from './AdminPanel/AdminPanel';
import ReviewEditPage from './ReviewEdit/pages/ReviewEditPage';
import HomePage from './Home/pages/HomePage';
import ErrorPage from './Error/pages/ErrorPage';
import MainPanel from './MemberPanel/pages/MainPanel';
import ChangeInfo from './MemberPanel/pages/ChangeInfo';
import ResetPassword from './MemberPanel/pages/ResetPassword';
import UploadProfilePic from './MemberPanel/pages/UploadProfilePic';
import WishList from './MemberPanel/pages/WishList';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, //Layout (Navbar & Footer)
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'adminPanel',
        element: <AdminPanel />,
      },
      {
        path: 'game/:id',
        children: [
          {
            index: true,
            element: <h1>Insert game page here</h1>,
          },
          {
            path: 'reviewEdit',
            element: <ReviewEditPage />,
          },
        ],
      },
      {
        path: 'member/:uid',
        children: [
          {
            index: true,
            element: <MainPanel />
          },
          {
            path: 'change-info',
            element: <ChangeInfo />
          },
          {
            path: 'reset-password',
            element: <ResetPassword />
          },
          {
            path: 'upload-profile-pic',
            element: <UploadProfilePic />
          },
          {
            path: 'wishlist',
            element: <WishList />
          }
        ]
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
