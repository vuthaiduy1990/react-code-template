import React from 'react';
import { Router, Redirect, useLocation } from '@reach/router';
import loadable from '@loadable/component';
import pMinDelay from 'p-min-delay';

import Loading from '@@components/loading';

import { Routes } from './routes';
import MainLayout from './layouts/main-layout';

const DELAY = 100; // miliseconds

// To avoid flashing a loader if the loading is very fast, you could implement a minimum delay
const Login = loadable(() => pMinDelay(import('@@pages/login'), 2000)); // for demo loading indicator
const Dashboard = loadable(() => pMinDelay(import('@@pages/dashboard'), DELAY));
const HeroAssociation = loadable(() => pMinDelay(import('@@pages/hero-association'), DELAY));
const MonsterAssociation = loadable(() => pMinDelay(import('@@pages/monster-association'), DELAY));
const NotFound = loadable(() => pMinDelay(import('@@pages/not-found'), DELAY));

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
        <Login path="/login" fallback={<Loading />} />
        <Dashboard path={Routes.dashboard.path} />
        <HeroAssociation path={Routes['hero-association'].path} />
        <MonsterAssociation path={Routes['monster-association'].path} />
        <NotFound default />
      </Router>
    </MainLayout>
  );
};
export default App;
