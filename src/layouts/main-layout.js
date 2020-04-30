import React from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Footer from '@@components/footer';
import Header from '@@components/header';

import css from './main-layout.module.scss';
import { Routes } from '../routes';

const MainLayout = ({ children }) => {
  return (
    <div className={css['main-layout']}>
      <Header routes={Routes} />
      <PerfectScrollbar>
        <div className={css.body}>{children}</div>
      </PerfectScrollbar>
      <Footer />
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default MainLayout;
