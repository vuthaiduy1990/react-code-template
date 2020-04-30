import React from 'react';
import PropTypes from 'prop-types';
import Footer from '@@components/footer';

import css from './main-layout.module.scss';

const MainLayout = ({ children }) => {
  return (
    <div className={css['main-layout']}>
      <div className={css.body}>{children}</div>
      <Footer />
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default MainLayout;
