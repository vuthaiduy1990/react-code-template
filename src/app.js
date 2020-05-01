import React from 'react';
import { Router } from '@reach/router';
import loadable from '@loadable/component';

import { Routes } from './routes';
import MainLayout from './layouts/main-layout';

const Dashboard = loadable(() => import('@@pages/dashboard'));
const HeroAssociation = loadable(() => import('@@pages/hero-association'));
const MonsterAssociation = loadable(() => import('@@pages/monster-association'));
const NotFound = loadable(() => import('@@pages/not-found'));

const App = () => (
  <MainLayout>
    <Router style={{ height: '100%', width: '100%' }}>
      <Dashboard path={Routes.dashboard.path} />
      <HeroAssociation path={Routes['hero-association'].path} />
      <MonsterAssociation path={Routes['monster-association'].path} />
      <NotFound default />
    </Router>
  </MainLayout>
);
export default App;
