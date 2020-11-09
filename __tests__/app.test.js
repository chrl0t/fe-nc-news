process.env.NODE_ENV = "test";
const app = require("../app");
const request = require("supertest");
const connection = require("../db/connection");

describe("/api", () => {
  afterAll(() => {
    return connection.destroy();
  });
  test("Returns 404 if passed invalid path", () => {
    const methods = ["get", "post", "delete", "patch"];
    const requestPromises = methods.map((method) => {
      return request(app)
        [method]("/nonExistentURL")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Not found");
        });
    });
    return Promise.all(requestPromises);
  });
  describe("/topics", () => {
    test("GET topics responds with all the topics in the database", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          expect(body.topics).toEqual(expect.any(Array));
          expect(body.topics.length).toBe(3);
        });
    });
  });
});
