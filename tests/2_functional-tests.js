const chaiHttp = require("chai-http");
const chai = require("chai");
let assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  test("Convert a valid input such as 10L:GET request to /api/convert", (done) => {
    chai
      .request(server)
      .get("/api/convert?input=10L")
      .end((err, res) => {
        let value = parseFloat((10 / 3.78541).toFixed(5));
        let obj = JSON.parse(res.text);
        assert.equal(200, res.status,"server is working!");
        assert.propertyVal(obj,"initNum",10);
        assert.propertyVal(obj,"initUnit","L");
        assert.propertyVal(obj,"returnUnit","gal");
        assert.propertyVal(obj,"returnNum",value);
        assert.propertyVal(obj,"string",`10 liters converts to ${value} gallons`);
      });
      done();
  });

  test("Convert an invalid input such as 32g: GET request to /api/convert", (done) => {
    chai
      .request(server)
      .get("/api/convert?input=32g")
      .end((err, res) => {
        assert.equal(200, res.status, "server is working!");
        assert.equal(res.text, "invalid unit");
      });
      done();
  });

  test("Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert", (done) => {
    chai
      .request(server)
      .get("/api/convert?input=3/7.2/4kgL")
      .end((err, res) => {
        assert.equal(200, res.status, "server is working!");
        assert.equal(res.text, "invalid number and unit");
      });
      done();
  });

  test("Convert with no number such as kg: GET request to /api/convert", (done) => {
    chai
      .request(server)
      .get("/api/convert?input=kg")
      .end((err, res) => {
        let obj = JSON.parse(res.text);
        let value = parseFloat((1/0.453592).toFixed(5));
        assert.equal(200, res.status, "server is working!");
        assert.propertyVal(obj, "initNum", 1);
        assert.propertyVal(obj, "initUnit", "kg");
        assert.propertyVal(obj, "returnUnit", "lbs");
        assert.propertyVal(obj, "returnNum", value);
        assert.propertyVal(
          obj,
          "string",
          `1 kilograms converts to ${value} pounds`
        );
      });
      done();
  });

  test("invalid number AND unit get request to /api/convert", (done) => {
    chai
      .request(server)
      .get("/api/convert?input=3/7.2/4kilomegagram")
      .end((err, res) => {
        assert.equal(200, res.status, "server is working!");
        assert.equal(res.text, "invalid number and unit");
        done();
      });
  });
});
