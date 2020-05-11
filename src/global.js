import React from 'react';

const global = {
  // reference to loading component
  loadingRef: React.createRef(),
};

export default React.createContext(global);
