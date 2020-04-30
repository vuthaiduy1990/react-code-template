import React, { Suspense, lazy } from 'react';
import { Router } from '@reach/router';

import { Routes } from './routes';
import MainLayout from './layout/main-layout';

const Dashboard = lazy(() => import('@@pages/dashboard'));
const HeroAssociation = lazy(() => import('@@pages/hero-association'));
const MonsterAssociation = lazy(() => import('@@pages/monster-association'));
const NotFound = lazy(() => import('@@pages/not-found'));

const App = () => (
  <MainLayout>
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Dashboard path={Routes.dashboard.path} />
        <HeroAssociation path={Routes['hero-association'].path} />
        <MonsterAssociation path={Routes['monster-association'].path} />
        <NotFound default />
      </Router>
    </Suspense>
  </MainLayout>
);
export default App;
