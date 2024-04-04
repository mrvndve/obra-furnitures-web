import React, { Fragment } from 'react';

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import AuthLayout from '@pages/layouts/auth-layout';

import ErrorPage from '@pages/error-page';
import RegisterPage from '@pages/register';
import LoginPage from '@pages/login';
import ForgotPasswordPage from '@pages/forgot-password';

const AppRoutes = () => {
  const AUTH_ROUTES = [
    {
      path: '/:role/register',
      page: <RegisterPage/>
    },
    {
      path: '/:role/login',
      page: <LoginPage/>
    },
    {
      path: '/:role/forgot-password',
      page: <ForgotPasswordPage/>
    }
  ];

  return <>
    <BrowserRouter>
      <Routes>
        {AUTH_ROUTES.map((route, key) => (
          <Fragment key={key}>
            <Route
              path={route.path}
              element={
                <AuthLayout>
                  {route.page}
                </AuthLayout>
              }
            />
          </Fragment>
        ))}

        <Route
          path='*'
          element={<ErrorPage/>}
        />
      </Routes>
    </BrowserRouter>
  </>;
};

export default AppRoutes;