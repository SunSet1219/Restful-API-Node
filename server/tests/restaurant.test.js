import mongoose from 'mongoose';
import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import app from '../../index';
import Restaurant from '../models/restaurant.model';

chai.config.includeStack = true;

/**
 * root level hooks
 */
after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe('## Restaurant APIs', () => {
  let restaurant = new Restaurant({
    name: 'Yerevan Pandok',
    slug: 'yerevan-pandok1',
    country: 'Armenia',
    city: 'Yerevan',
    restaurant_category: 'Main restaurants',
    address: 'Amiryan 5'
  });

  describe('# POST /api/restaurants', () => {
    it('should create a new restaurant', (done) => {
      request(app)
        .post('/api/restaurants')
        .send(restaurant)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal(restaurant.name);
          expect(res.body.slug).to.equal(restaurant.slug);
          restaurant = res.body;
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/restaurants/:restaurantId', () => {
    it('should get restaurant details', (done) => {
      request(app)
        .get(`/api/restaurants/${restaurant._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal(restaurant.name);
          expect(res.body.slug).to.equal(restaurant.slug);
          done();
        })
        .catch(done);
    });

    it('should report error with message - Not found, when restaurant does not exists', (done) => {
      request(app)
        .get('/api/restaurants/56c787ccc67fc16ccc1a5e92')
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message).to.equal('Not Found');
          done();
        })
        .catch(done);
    });
  });

  // describe('# PUT /api/restaurants/:restaurantId', () => {
  //   it('should update restaurant details', (done) => {
  //     restaurant.name = 'vv';
  //     request(app)
  //       .put(`/api/restaurants/${restaurant._id}`)
  //       .send(restaurant)
  //       .expect(httpStatus.OK)
  //       .then((res) => {
  //         expect(res.body.name).to.equal('KK');
  //         expect(res.body.slug).to.equal(restaurant.slug);
  //         done();
  //       })
  //       .catch(done);
  //   });
  // });

  describe('# GET /api/restaurants/', () => {
    it('should get all restaurants', (done) => {
      request(app)
        .get('/api/restaurants')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });

    it('should get all restaurants (with limit and skip)', (done) => {
      request(app)
        .get('/api/restaurants')
        .query({ limit: 10, skip: 1 })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });
  });

  describe('# DELETE /api/restaurants/', () => {
    it('should delete restaurant', (done) => {
      request(app)
        .delete(`/api/restaurants/${restaurant._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal(restaurant.name);
          expect(res.body.slug).to.equal(restaurant.slug);
          done();
        })
        .catch(done);
    });
  });
});
