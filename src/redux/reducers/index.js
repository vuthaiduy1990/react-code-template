import { combineReducers } from 'redux';

import sampleReducer from './sample';
import commonReducer from './common';

// combine all reducers into one
const rootReducer = combineReducers({
  sample: sampleReducer,
  common: commonReducer,
});
export default rootReducer;
