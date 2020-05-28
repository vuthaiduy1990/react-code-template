/**
 * Fork vs. Spawn
 * Fork and spawn will both return Task objects. Forked tasks are attached to parent,
 * whereas spawned tasks are detached from the parent.
 *
 * --->>> Error handling in forks [link]:
 * <pre>
 * Errors from child tasks automatically bubble up to their parents.
 * If any forked task raises an uncaught error, then the parent task will abort with the child Error,
 * and the whole Parent's execution tree
 * (i.e. forked tasks + the main task represented by the parent's body if it's still running) will be cancelled.
 * </pre
 *
 * --->>> Error handling in spawned tasks [link]:
 * <pre>
 * The parent will not wait for detached tasks to terminate before returning and all events
 * which may affect the parent or the detached task are completely independent (error, cancellation).
 * </pre>
 *
 * --->>> Based on above
 * Use fork for "mission critical" tasks, i.e. "if this task fails, please crash the whole app".
 * Use spawn for "not critical" tasks, i.e. "if this task fails, do not propagate the error to the parent".
 *
 * @see https://redux-saga.js.org/docs/advanced/RootSaga.html
 * @see https://redux-saga.js.org/docs/advanced/ForkModel.html
 * @see https://stackoverflow.com/questions/39438005/what-is-the-idiomatic-way-of-starting-rootsaga
 */

import { spawn, all } from 'redux-saga/effects';
import sampleSaga from './sample';

export default function* rootSaga() {
  yield all([spawn(sampleSaga)]);
}
