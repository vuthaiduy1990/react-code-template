/**
 * The following docs lists many recommended patterns, best practices,
 * and suggested approaches for writing Redux applications.
 * So puruse it.
 *
 * @see https://redux.js.org/style-guide/style-guide
 * @see https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns
 */
import { SET_LOADING_VISIBLE } from '@@actions/common';

// set initial state
// Check initial state in pages/index.js when configuring the store
// becase it may overshadow this value.
const initialState = {
  loading: false,
};

/**
 * On loading visibility setting
 *
 * @param {Object} state state
 * @param {Object} visile whether the loading indicator is visible or not
 */
const onLoadingVisibiitySetting = (state, { visile }) => {
  return {
    ...state,
    loading: visile,
  };
};

// Map action with handlers
const handlers = {
  [SET_LOADING_VISIBLE]: onLoadingVisibiitySetting,
};

// Execute handler respective to action
export default (state = initialState, action = {}) => {
  return handlers[action.type] ? handlers[action.type](state, action) : state;
};
