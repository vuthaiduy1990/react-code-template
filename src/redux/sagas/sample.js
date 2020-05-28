import { takeLatest, takeEvery, delay, put, select, call } from 'redux-saga/effects';

import { GET_SAMPLE_DATA, INSERT_SAMPLE_DATA, onSampleDataLoaded, onSampleDataInserted } from '@@actions/sample';
import { getEmployees } from '../apis/sample';

/**
 * Get sample data
 *
 * @param {Object} action. It look like insertSampleData function below
 *
 * @see actions/sample.js
 */
function* getSampleData(action) {
  try {
    yield delay(100); // 😎 delay for fun
    // Do API call here. Something look like
    const result = yield call(getEmployees);

    // Dispath data loaded action
    // This action is mapped with respective reducer defined in reducers/sample.js
    // The reducer will handle some data logics like pre-processing
    yield put(onSampleDataLoaded(result));

    // Next, we can retrieve data after pre-processing via state
    const employees = yield select(state => state.sample.employees);

    // Handle callback function
    if (action.callback) action.callback(null, employees);
  } catch (ex) {
    if (action.callback) action.callback(ex, null);
  }
}

/**
 * Insert new sample data
 * @param {String} type action's type
 * @param {Object} payload action's payload data
 * @param {Function} callback callback function
 */
function* insertSampleData({ type, payload, callback }) {
  try {
    // DO insert API call here. Something look like
    // const insertedData = yield call(....)
    const insertData = type.length > 0 ? payload : {};

    // Dispath data loaded action
    // This action will map with respective reducer defined in reducers/sample.js
    yield put(onSampleDataInserted(insertData));

    // Handle callback function
    if (callback) callback(null, null);
  } catch (ex) {
    if (callback) callback(ex, null);
  }
}

/**
 * Yield all function
 *
 * --->>> takeEvery
 * Allows multiple instances of these sagas to run concurrently
 *
 * --->>> takeLatest
 * Doesn't allow multiple Saga tasks to be fired concurrently.
 * As soon as it gets a new dispatched action, it cancels any previously-forked task (if still running).
 * Be useful to handle AJAX requests where we want to only have the response to the latest request.
 *
 * @see https://redux-saga.js.org/docs/advanced/Concurrency.html
 */
export default function* service() {
  yield takeLatest(GET_SAMPLE_DATA, getSampleData); // always get latest data
  yield takeEvery(INSERT_SAMPLE_DATA, insertSampleData);
}
