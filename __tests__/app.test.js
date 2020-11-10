process.env.NODE_ENV = 'test';
const app = require('../app');
const request = require('supertest');
const connection = require('../db/connection');

describe('/api', () => {
  afterAll(() => {
    return connection.destroy();
  });
  beforeEach(() => {
    return connection.seed.run();
  });
  test('ERROR - status code 404 - if passed invalid path', () => {
    const methods = ['get', 'post', 'delete', 'patch'];
    const requestPromises = methods.map((method) => {
      return request(app)
        [method]('/nonExistentURL')
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe('Not found');
        });
    });
    return Promise.all(requestPromises);
  });
  describe('/topics', () => {
    test('GET - status code 200 - return all the topics in the database', () => {
      return request(app)
        .get('/api/topics')
        .expect(200)
        .then(({ body }) => {
          expect(body.topics).toEqual(expect.any(Array));
          expect(body.topics.length).toBe(3);
        });
    });
  });
  describe('/users', () => {
    describe('/users/:username', () => {
      test('GET - status code 200 - returns user matching passed username', () => {
        return request(app)
          .get('/api/users/butter_bridge')
          .expect(200)
          .then((res) => {
            expect(res.body.user).toEqual(expect.any(Array));
            expect(res.body.user.length).toBe(1);
          });
      });
      test('ERROR - status code 404 - when username doesnt exist', () => {
        return request(app)
          .get('/api/users/this_is_not_a_username')
          .expect(404)
          .then((res) => {
            expect(res.body).toEqual({ msg: 'NOT FOUND' });
          });
      });
    });
  });
});
