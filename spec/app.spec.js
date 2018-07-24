process.env.NODE_ENV = "test";
const { app } = require("../app");
const request = require("supertest")(app);
const { expect } = require("chai");
const seedDB = require("../seed/seed");
const testData = require("../seed/testData");
const mongoose = require("mongoose");

let userDocs;
let journeyDocs;

describe("project_phase_test", () => {
  beforeEach(() => {
    return seedDB(testData).then(docs => {
      [userDocs, journeyDocs] = docs;
    });
  });
  after(() => {
    return mongoose.disconnect();
  });
  // get all users
  describe("/api/users", () => {
    it("GET responds with all users", () => {
      return request
        .get("/api/users")
        .expect(200)
        .then(res => {
          const users = res.body.users;
          expect(users.length).to.equal(4);
          expect(users[0]).to.include.keys(
            "username",
            "email",
            "avatar",
            "xp",
            "achievements"
          );
        });
    });
  });
});