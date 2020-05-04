import React, { memo } from 'react';
import PropTypes from 'prop-types';

import css from './styles.module.scss';

const Loading = ({ visible }) => {
  return (
    <>
      {visible ? (
        <div className={css.overlay}>
          <img src="/loading.gif" alt="" className={css.loading} />
        </div>
      ) : null}
    </>
  );
};

Loading.propTypes = {
  visible: PropTypes.bool,
};
Loading.defaultProps = {
  visible: true,
};
export default memo(Loading);
