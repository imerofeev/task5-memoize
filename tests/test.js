const mocha = require('mocha');
const assert = require("chai").assert;
const memoize = require("../index").memoize;

describe('memoize', () => {
  it('should be a function', () => {
    expect(memoize).to.be.a('function');
  });

  it('should return undefined if no function provided', () => {
    [undefined, null, 123, {}].forEach((arg) => {
      expect(memoize(arg)).to.be.an('null');
    });
  });

  it('should return some function if function was provided', () => {
    expect(memoize(() => {})).to.be.a('function');
  });

  it('function with 1 equal argument called once', () => {
    let count = 0;
    const func = (num) => {
      count++;
      return num ** 2;
    };
    const memoizationFunction = memoize(func);
    memoizationFunction(2);
    memoizationFunction(2);
    assert.equal(count, 1);
  });

  it('function with 1 unequal argument called twice', () => {
    let count = 0;
    const func = (num) => {
      count++;
      return num ** 2;
    };
    const memoizationFunction = memoize(func);
    memoizationFunction(2);
    memoizationFunction(3);
    assert.equal(count, 2);
  });
});