/* eslint-disable no-console */
/**
 * Enhancers add extra functionality to the Redux store.
 * @see stores for applying enhancers
 */

export const MonitorReducer = createStore => (reducer, initialState, enhancer) => {
  const monitoredReducerWorker = (state, action) => {
    const start = new Date().getTime();
    const newState = reducer(state, action);
    const end = new Date().getTime();
    const diff = end - start;
    console.log(`🕖 [${action.type}] Reducer process time: `, diff);

    return newState;
  };

  return createStore(monitoredReducerWorker, initialState, enhancer);
};
