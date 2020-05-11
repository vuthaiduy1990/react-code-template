/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, forwardRef, useImperativeHandle, memo } from 'react';

import Loading from './index';

const ImperativeLoading = forwardRef((_, ref) => {
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    // show modal with given data
    show() {
      setVisible(true);
    },

    // hide modal
    hide() {
      setVisible(false);
    },
  }));

  return (
    <>
      <Loading visible={visible} />
    </>
  );
});
export default memo(ImperativeLoading);
