import React from 'react';
import { ConfigProvider } from 'antd';
import enUS from 'antd/es/locale/en_US';

import App from '../app';

const Root = () => (
  <ConfigProvider locale={enUS}>
    <App />
  </ConfigProvider>
);
export default Root;
