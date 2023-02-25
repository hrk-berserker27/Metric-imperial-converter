const chai = require("chai");
let assert = chai.assert;

const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("test for project", () => {
  test("convertHandler should correctly read a whole number input", () => {
    const result = convertHandler.getNum("5km");
    assert.strictEqual(result, 5);
  });
  test("convertHandler should correctly read a decimal number input", () => {
    const result = convertHandler.getNum("5.5km");
    assert.strictEqual(result, 5.5);
  });
  test("convertHandler should correctly read a functional input", () => {
    const result = convertHandler.getNum("5/3km");
    assert.strictEqual(result, 5 / 3);
  });
  test("convertHandler should correctly read a fractional input with a decimal", () => {
    const result = convertHandler.getNum("5/3.5km");
    assert.strictEqual(result, 5 / 3.5);
  });
  test("convertHandler should correctly return an error on a double fraction", () => {
    const result = convertHandler.getNum("5/3/7km");
    assert.notStrictEqual(result, 5 / 3 / 7);
  });
  test("convertHandler should correctly default to a numerical input of 1 when no numerical input is provided", () => {
    const result = convertHandler.getNum("km");
    assert.strictEqual(result, 1);
  });
  test("convertHandler should correctly read each valid input unit", () => {
    const result = convertHandler.getUnit("8km");
    assert.strictEqual(result, "km");
  });
  test("convertHandler should correctly return an error for an invalid input unit", () => {
    const result = convertHandler.getNum("8nm");
    assert.notStrictEqual(result, "nm");
  });

  test("convertHandler should return the correct return unit for each valid input unit", () => {
    const result = convertHandler.getReturnUnit("km");
    assert.strictEqual(result, "mi");
  });
  test("convertHandler should correctly return the spelled-out string unit for each valid input unit", () => {
    const result = convertHandler.spellOutUnit("km");
    assert.strictEqual(result, "kilometers");
  });
  test("convertHandler should correctly convert gal to L", () => {
    const result = convertHandler.convert(1, "gal");
    assert.approximately(result, 3.78541, 0.1);
  });
  test("convertHandler should correctly convert L to gal", () => {
    const result = convertHandler.convert(1, "L");
    assert.approximately(result, 1 / 3.78541, 0.1);
  });
  test("convertHandler should correctly convert mi to km", () => {
    const result = convertHandler.convert(1, "mi");
    assert.approximately(result, 1.60934, 0.1);
  });
  test("convertHandler should correctly convert km to mi", () => {
    const result = convertHandler.convert(1, "km");
    assert.approximately(result, 1 / 1.60934, 0.1);
  });
  test("convertHandler should correctly convert lbs to kg", () => {
    const result = convertHandler.convert(1, "lbs");
    assert.approximately(result, 0.453592, 0.1);
  });
  test("convertHandler should correctly convert kg to lbs", () => {
    const result = convertHandler.convert(1, "kg");
    assert.approximately(result, 1 / 0.453592, 0.1);
  });
});
