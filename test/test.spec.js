const assert = require("chai").assert;
const expect = require("chai").expect;
const sinon = require("sinon");
const fc = require("fast-check");
const memoize = require("../memoize").memoize;

describe("Memoization Function", () => {
  it("should be a function", () => {
    expect(memoize).to.be.a("function");
  });

  it("should return some function if function was provided", () => {
    expect(memoize(() => {})).to.be.a("function");
  });

  describe("Checking num**2", () => {
    const testMemo = (num) => num ** 2,
      testMemoize = memoize(testMemo);
    it("should return n ** 2", () => {
      fc.assert(
        fc.property(fc.integer(), (n) => {
          assert.equal(testMemoize(n), n ** 2);
        }),
      );
    });
  });

  describe("Checking double call", () => {
    it("there should not be two calls", () => {
      const callback = sinon.fake();
      const memoizeFunc = memoize(callback);
      memoizeFunc(2);
      memoizeFunc(2);
      sinon.assert.calledOnce(callback);
    });
  });

  describe("Cheking reference types", () => {
    it("there should not be two calls with object", () => {
      const callback = sinon.fake();
      const memoizeFunc = memoize(callback);
      const obj = { id: 1 };
      memoizeFunc(obj);
      memoizeFunc(obj);
      sinon.assert.calledOnce(callback);
    });

    it("there should not be two calls with function", () => {
      const callback = sinon.fake();
      const memoizeFunc = memoize(callback);
      memoizeFunc(callback);
      memoizeFunc(callback);
      sinon.assert.calledOnce(callback);
    });
  });

  describe("Checking many arguments", () => {
    describe("Value types", () => {
      it("number", () => {
        const callback = sinon.fake();
        const memoizeFunc = memoize(callback);
        memoizeFunc(2, 3);
        memoizeFunc(2, 3);
        sinon.assert.calledOnce(callback);
      });
      it("number + string", () => {
        const callback = sinon.fake();
        const memoizeFunc = memoize(callback);
        memoizeFunc(2, "testing data");
        memoizeFunc(2, "testing data");
        sinon.assert.calledOnce(callback);
      });
    });
    describe("Reference types", () => {
      it("object", () => {
        const callback = sinon.fake(),
          memoizeFunc = memoize(callback),
          obj1 = { id: 1 },
          str = "testing data",
          obj2 = { test: "testing data" };

        memoizeFunc(obj1, str, obj2);
        memoizeFunc(obj1, str, obj2);

        sinon.assert.calledOnce(callback);
      });
      it("array", () => {
        const callback = sinon.fake(),
          memoizeFunc = memoize(callback),
          arr1 = [1, 2, 3],
          str = "testing data",
          arr2 = ["testing data", 34, "123"];

        memoizeFunc(arr1, str, arr2);
        memoizeFunc(arr1, str, arr2);

        sinon.assert.calledOnce(callback);
      });
    });
  });
});