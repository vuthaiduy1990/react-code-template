import React from 'react';
import { ConfigProvider } from 'antd';
import enUS from 'antd/es/locale/en_US';

import ImperativeLoading from '@@components/loading/ImperativeLoading';

import App from '../app';
import GlobalContext from '../global';

const Root = () => (
  <GlobalContext.Consumer>
    {global => (
      <ConfigProvider locale={enUS}>
        <App />
        <ImperativeLoading ref={global.loadingRef} />
      </ConfigProvider>
    )}
  </GlobalContext.Consumer>
);
export default Root;
