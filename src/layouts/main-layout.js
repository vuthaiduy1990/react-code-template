import React from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { Routes } from 'routes';
import Footer from '@@components/footer';
import Header from '@@components/header';

import * as css from './main-layout.module.scss';

function MainLayout({ children }) {
  return (
    <div className={css.mainLayout}>
      <Header routes={Routes} />
      <PerfectScrollbar>
        <div className={css.body}>{children}</div>
      </PerfectScrollbar>
      <Footer />
    </div>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default MainLayout;
