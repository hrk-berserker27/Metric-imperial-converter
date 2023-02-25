"use strict";

//const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler");
const express = require("express");
const router = express.Router();

const message1 = "invalid number";
const message2 = "invalid unit";
const message3 = "invalid number and unit";

module.exports = function (app) {
  let convertHandler = new ConvertHandler();
  app.use(router);
  router.get("/api/convert", (req, res) => {
    let input = req.query.input;
    try {
      let initNum = convertHandler.getNum(input);
      let initUnit = convertHandler.getUnit(input);

      if(initNum === message1 && initUnit !== message2) {
        throw new Error(message1);
      }
      if(initUnit === message2 && initNum !== message1) {
        throw new Error(message2);
      }
      if(initUnit === message2 && initNum === message1){
        throw new Error(message3);
      }

      let returnUnit = convertHandler.getReturnUnit(initUnit);
      let returnNum = convertHandler.convert(initNum,initUnit);
      let concatString = convertHandler.getString(initNum,initUnit,returnNum,returnUnit);

      initUnit = initUnit === 'l' ? "L" : initUnit;
      returnUnit = returnUnit === "l" ? "L" : returnUnit;

      res.json({
        initNum,initUnit,returnNum,returnUnit,string : concatString
      });

    } catch (err) {
      res.send(err.message);
    }
  });
};
