/* eslint-disable no-undef */
import assert from 'assert';
import { noop } from './common';

const a = 1;
describe(`UT-${a}. Common Utilities`, () => {
  const b = 1;

  // Test noop function
  describe(`UT-${a}.${b}. noop function`, () => {
    let c = 1;

    // call noop with no parameter
    it(`UT-${a}.${b}.${c}. test noop function with no parameter`, (done) => {
      assert.equal('', noop());
      done();
    });

    // call noop with parameter
    c += 1;
    it(`UT-${a}.${b}.${c}. test noop function with parameter`, (done) => {
      assert.equal('', noop('xxx'));
      done();
    });
  });
});
