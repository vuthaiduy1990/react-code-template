/**
 * The following docs lists many recommended patterns, best practices,
 * and suggested approaches for writing Redux applications.
 * So puruse it.
 *
 * @see https://redux.js.org/style-guide/style-guide
 * @see https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns
 */
import { ON_SAMPLE_DATA_LOADED, ON_SAMPLE_DATA_INSERTED } from '@@actions/sample';

// set initial state
// Check initial state in pages/index.js when configuring the store
// becase it may overshadow this value.
const initialState = {
  employees: [],
};

/**
 * On sample data loaded handler
 *
 * @param {Object} state state
 * @param {Object} result array of employees
 */
const onSampleDataLoaded = (state, { result }) => {
  // Do Not Mutate State
  // Nice thread to go
  // https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns
  return {
    ...state,
    employees: result.map(item => ({ ...item, key: `${item.id}`, source: 'dummy.restapiexample.com' })),
  };
};

/**
 * On sample data inserted handler
 *
 * @param {Object} state
 * @param {Object} action. @see actions/sample.js
 */
const onSampleDataInserted = (state, action) => {
  return {
    ...state,
    employees: [state.employees, action.result],
  };
};

// Map action with handlers
const handlers = {
  [ON_SAMPLE_DATA_LOADED]: onSampleDataLoaded,
  [ON_SAMPLE_DATA_INSERTED]: onSampleDataInserted,
};

// Execute handler respective to action
export default (state = initialState, action) => {
  return handlers[action.type] ? handlers[action.type](state, action) : state;
};
