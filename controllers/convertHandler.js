class ConvertHandler {
  constructor() {
    // this.getNum.bind(this);
    // this.getUnit.bind(this);
    // this.getReturnUnit.bind(this);
    // this.getString.bind(this);
    // this.spellOutUnit.bind(this);
    // this.convert.bind(this);
  }
  getNum = function (input) {
    let result = "invalid number",
      number,
      arr;
    //regular expression to check for number|fraction|decimal as in order
    let regEx = /[\d+]|[\d+\/\d+]|[\d+\.\d+]/gi;
    let matchGroup = input.match(regEx); //returns null if no proper value matched
    if (matchGroup) {
      //rejoining the matchedGroups to form a string
      number = matchGroup.join("");
      //checking for fractions
      if (number.includes("/")) {
        //getting the numerator and denominator by spliting on /
        arr = number.split("/");
        //valid fraction-> arr[0] = numerator & arr[1] = denominator
        if (arr.length === 2) {
          //converting fraction to decimal by dividing
          number = arr[0] / arr[1];
        } //else if (arr.length >= 2) {
        //   throw new Error("Double fraction error");
        // }
      }
      //only for numbers -> ex: "ab"/"bc" gives NaN so it will return false
      if (!isNaN(number)) {
        result = Number.parseFloat(number);
      }
    } else {
      let regExForUnit = /[a-z]+/i;
      let separatedUnit = input.match(regExForUnit)[0];
      let unitLength = separatedUnit.length;
      let initialLength = input.length;

      //if check for empty value but valid unit
      if (
        this.getUnit(separatedUnit) !== "invalid unit" &&
        unitLength === initialLength
      ) {
        result = 1;
      }
    }
    return result;
  };

  getUnit = function (input) {
    let result = "invalid unit";
    let regEx = /[a-z]+/i;
    let arr = input.match(regEx);
    if(Array.isArray(arr)){
      let initUnit = arr[0].toLowerCase();
      switch (initUnit) {
        case "kg":
        case "lbs":
        case "km":
        case "mi":
        case "l":
        case "gal":
          result = initUnit;
          break;
        default:
          //throw new Error("invalid unit");
          result = "invalid unit";
      }
    }
    return result;
  };

  getReturnUnit = function (initUnit) {
    let result;
    initUnit = initUnit.toLowerCase();
    switch (initUnit) {
      case "kg":
        result = "lbs";
        break;
      case "lbs":
        result = "kg";
        break;
      case "km":
        result = "mi";
        break;
      case "mi":
        result = "km";
        break;
      case "l":
        result = "gal";
        break;
      case "gal":
        result = "l";
        break;
      default:
        result = "invalid unit";
    }
    return result;
  };

  spellOutUnit = function (unit) {
    let result;
    unit = unit.toLowerCase();
    switch (unit) {
      case "kg":
        result = "kilograms";
        break;
      case "lbs":
        result = "pounds";
        break;
      case "km":
        result = "kilometers";
        break;
      case "mi":
        result = "miles";
        break;
      case "l":
        result = "liters";
        break;
      case "gal":
        result = "gallons";
        break;
    }
    return result;
  };

  convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    initUnit = initUnit.toLowerCase();
    let result;
    switch (initUnit) {
      case "gal":
        result = initNum * galToL;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "l":
        result = initNum / galToL;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      case "km":
        result = initNum / miToKm;
        break;
      default: 
        throw new Error("invalid unit");
    }
    result = parseFloat(result.toFixed(5));
    return result;
  };

  getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result;
    if (initUnit === "l") {
      initUnit = "L";
    } else if (returnUnit === "l") {
      returnUnit = "L";
    }
    result = `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    return result;
  };
}

module.exports = ConvertHandler;
