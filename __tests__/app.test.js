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
          expect(body.msg).toBe('NOT FOUND');
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
            expect(res.body.user.length).toBe(1);
            expect(res.body.user[0]).toEqual({
              username: 'butter_bridge',
              name: 'jonny',
              avatar_url:
                'https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg',
            });
          });
      });
      test('GET ERROR - status code 404 - when username doesnt exist', () => {
        return request(app)
          .get('/api/users/this_is_not_a_username')
          .expect(404)
          .then((res) => {
            expect(res.body).toEqual({ msg: 'NOT FOUND' });
          });
      });
    });
  });
  describe('/articles', () => {
    describe('/articles/:article_id', () => {
      test('GET - status code 200 - returns article matching passed id', () => {
        return request(app)
          .get('/api/articles/1')
          .expect(200)
          .then((res) => {
            expect(res.body.article.length).toBe(1);
            expect(res.body.article[0]).toEqual({
              article_id: 1,
              title: 'Living in the shadow of a great man',
              author: 'butter_bridge',
              body: 'I find this existence challenging',
              topic: 'mitch',
              created_at: '2018-11-15T12:21:54.000Z',
              votes: 100,
            });
          });
      });
      test('PATCH - status code 201 - will update the vote count and return the updated article', () => {
        return request(app)
          .patch('/api/articles/1')
          .send({ inc_votes: 10 })
          .expect(201)
          .then((res) => {
            expect(res.body.article.length).toBe(1);
            expect(res.body.article[0]).toEqual({
              article_id: 1,
              title: 'Living in the shadow of a great man',
              author: 'butter_bridge',
              body: 'I find this existence challenging',
              topic: 'mitch',
              created_at: '2018-11-15T12:21:54.000Z',
              votes: 110,
            });
          });
      });
      test('PATCH ERROR - status code 404 - when passed article id doesnt exist', () => {
        return request(app)
          .post('/api/articles/10000000')
          .expect(404)
          .then((res) => {
            expect(res.body).toEqual({ msg: 'NOT FOUND' });
          });
      });
      test('GET ERROR - status code 404 - when passed article id doesnt exist', () => {
        return request(app)
          .get('/api/articles/10000000')
          .expect(404)
          .then((res) => {
            expect(res.body).toEqual({ msg: 'NOT FOUND' });
          });
      });
      test('GET ERROR - status code 400 - when passed article id is invalid', () => {
        return request(app)
          .get('/api/articles/two')
          .expect(400)
          .then((res) => {
            expect(res.body).toEqual({ msg: 'BAD REQUEST' });
          });
      });
    });
  });
});
