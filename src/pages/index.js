import React from 'react';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import enUS from 'antd/es/locale/en_US';

import ImperativeLoading from '@@components/loading/ImperativeLoading';

import App from '../app';
import GlobalContext from '../global';
import configStore from '../redux/stores';

const Root = () => {
  // initial state
  const initalState = {
    // @see rootReducer
    // this field should be matching with field in rootReducer
    // Be-careful, if you set initial state for sample here,
    // the initial state is initiated in sampe-reducer.js will not be used.
    // sample: {},
  };

  return (
    <GlobalContext.Consumer>
      {global => (
        <ConfigProvider locale={enUS}>
          <Provider store={configStore(initalState)}>
            <App />
            <ImperativeLoading ref={global.loadingRef} />
          </Provider>
        </ConfigProvider>
      )}
    </GlobalContext.Consumer>
  );
};
export default Root;
