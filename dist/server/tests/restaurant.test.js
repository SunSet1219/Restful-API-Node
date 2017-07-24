'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _supertestAsPromised = require('supertest-as-promised');

var _supertestAsPromised2 = _interopRequireDefault(_supertestAsPromised);

var _httpStatus = require('http-status');

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _index = require('../../index');

var _index2 = _interopRequireDefault(_index);

var _restaurant = require('../models/restaurant.model');

var _restaurant2 = _interopRequireDefault(_restaurant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.config.includeStack = true;

/**
 * root level hooks
 */
after(function (done) {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  _mongoose2.default.models = {};
  _mongoose2.default.modelSchemas = {};
  _mongoose2.default.connection.close();
  done();
});

describe('## Restaurant APIs', function () {
  var restaurant = new _restaurant2.default({
    name: 'Yerevan Pandok',
    slug: 'yerevan-pandok1',
    country: 'Armenia',
    city: 'Yerevan',
    restaurant_category: 'Main restaurants',
    address: 'Amiryan 5'
  });

  describe('# POST /api/restaurants', function () {
    it('should create a new restaurant', function (done) {
      (0, _supertestAsPromised2.default)(_index2.default).post('/api/restaurants').send(restaurant).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.name).to.equal(restaurant.name);
        (0, _chai.expect)(res.body.slug).to.equal(restaurant.slug);
        restaurant = res.body;
        done();
      }).catch(done);
    });
  });

  describe('# GET /api/restaurants/:restaurantId', function () {
    it('should get restaurant details', function (done) {
      (0, _supertestAsPromised2.default)(_index2.default).get('/api/restaurants/' + restaurant._id).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.name).to.equal(restaurant.name);
        (0, _chai.expect)(res.body.slug).to.equal(restaurant.slug);
        done();
      }).catch(done);
    });

    it('should report error with message - Not found, when restaurant does not exists', function (done) {
      (0, _supertestAsPromised2.default)(_index2.default).get('/api/restaurants/56c787ccc67fc16ccc1a5e92').expect(_httpStatus2.default.NOT_FOUND).then(function (res) {
        (0, _chai.expect)(res.body.message).to.equal('Not Found');
        done();
      }).catch(done);
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

  describe('# GET /api/restaurants/', function () {
    it('should get all restaurants', function (done) {
      (0, _supertestAsPromised2.default)(_index2.default).get('/api/restaurants').expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body).to.be.an('array');
        done();
      }).catch(done);
    });

    it('should get all restaurants (with limit and skip)', function (done) {
      (0, _supertestAsPromised2.default)(_index2.default).get('/api/restaurants').query({ limit: 10, skip: 1 }).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body).to.be.an('array');
        done();
      }).catch(done);
    });
  });

  describe('# DELETE /api/restaurants/', function () {
    it('should delete restaurant', function (done) {
      (0, _supertestAsPromised2.default)(_index2.default).delete('/api/restaurants/' + restaurant._id).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.name).to.equal(restaurant.name);
        (0, _chai.expect)(res.body.slug).to.equal(restaurant.slug);
        done();
      }).catch(done);
    });
  });
});
//# sourceMappingURL=restaurant.test.js.map
