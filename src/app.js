import React from 'react';
import { Router, Redirect, useLocation } from '@reach/router';
import loadable from '@loadable/component';

import { Routes } from './routes';
import MainLayout from './layouts/main-layout';

const Login = loadable(() => import('@@pages/login'));
const Dashboard = loadable(() => import('@@pages/dashboard'));
const HeroAssociation = loadable(() => import('@@pages/hero-association'));
const MonsterAssociation = loadable(() => import('@@pages/monster-association'));
const NotFound = loadable(() => import('@@pages/not-found'));

const App = () => {
  const location = useLocation();
  const isLogged = typeof window !== 'undefined' && window.sessionStorage.getItem('account') !== null;

  if (isLogged) {
    // redirect to dashboard if user already logged in
    if (location.pathname === '/' || location.pathname === '/login') {
      return <Redirect to={Routes.dashboard.path} noThrow />;
    }
  } else if (location.pathname !== '/login') {
    // redirect to login page if user have not logged in while accessing other pages
    return <Redirect to="/login" state={{ redirectTo: location.pathname }} noThrow />;
  }

  return (
    <MainLayout>
      <Router style={{ height: '100%', width: '100%' }}>
        <Login path="/login" />
        <Dashboard path={Routes.dashboard.path} />
        <HeroAssociation path={Routes['hero-association'].path} />
        <MonsterAssociation path={Routes['monster-association'].path} />
        <NotFound default />
      </Router>
    </MainLayout>
  );
};
export default App;
