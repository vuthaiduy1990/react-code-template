/* eslint-disable no-console */
/**
 * Middleware adds extra functionality to the Redux dispatch functions
 * @see stores for applying middlewares
 */

/**
 * Logger middleware.
 * Add extra logging before/after to each dispatching
 */
export const Logger = (store) => (next) => (action) => {
  console.log(`🌼 [${action.type}] before dispatching`);
  const result = next(action);
  console.log(`🌼 [${action.type}] after dispatching: `, store.getState());
  return result;
};

/**
 * Crash Reporter middleware.
 * Add extra handler if exeception occurs
 */
export const CrashReporter = (store) => (next) => (action) => {
  try {
    return next(action);
  } catch (err) {
    // handle something here, for example logging bug, dispath an action, etc.
    // const state = store.getState();
    // store.dispatch(showErrorDialog());
    console.error('⚠ Caught an exception!', err, store.getState());
    throw err;
  }
};
