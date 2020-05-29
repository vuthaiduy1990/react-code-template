/**
 * https://redux.js.org/recipes/configuring-your-store/
 *
 * --->>> Basically, global state will cache data returning by reducers.
 * Therefore, state will look like
 * <pre>
 *    {
 *      sample: { // this field should be matching with field in rootReducer
 *        employees: [], // employee list
 *        xyz: {}, // other data here
 *      };
 *    }
 * </pre>
 *
 * --->>> The flow of redux will as the following
 * <pre>
 * 1. Dispatch action
 * 2. Saga handle API call
 * 3. Forward response's data to reducer for handling pure data logic -> update state
 * 4. Re-render page which map with data changes via useSelector hook or connect API
 * </pre>
 * @see rootReducer
 */

import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
// import { immutableStateInvariantMiddleware } from 'redux-immutable-state-invariant';

import { MonitorReducer } from '../enhancers';
import { Logger, CrashReporter } from '../middleware';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

const isDevMode = process.env.NODE_ENV === 'development';

/**
 * Configure store
 * @param {Object} initialState initial state
 */
export default function configStore(initialState) {
  // middlewares
  // Defined middlewares as arrays
  // -> Separate from the functions which consume them.
  // -> Easily add more middleware based on different conditions.
  const SagaMiddleware = createSagaMiddleware();
  const middlewares = [Logger, CrashReporter, SagaMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  // Enhancers
  // Defined enhancers as arrays for the same coding purpose as middleware
  const enhancers = [middlewareEnhancer, MonitorReducer];
  // In dev environment, use redux-devtools-extension to manage Redux store
  // https://github.com/zalmoxisus/redux-devtools-extension
  const composeFunc = isDevMode ? composeWithDevTools : compose;
  const composedEnhancers = composeFunc(...enhancers);

  // Create store
  const store = createStore(rootReducer, initialState, composedEnhancers);
  SagaMiddleware.run(rootSaga);
  return store;
}
