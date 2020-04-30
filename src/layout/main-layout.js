import React from 'react';
import PropTypes from 'prop-types';

const MainLayout = ({ children }) => <div>{children}</div>;

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default MainLayout;
