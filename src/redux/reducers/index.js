import { combineReducers } from 'redux';

import sampleReducer from './sample';

// combine all reducers into one
const rootReducer = combineReducers({
  sample: sampleReducer,
});
export default rootReducer;
