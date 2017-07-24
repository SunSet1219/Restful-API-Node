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

var _category = require('../models/category.model');

var _category2 = _interopRequireDefault(_category);

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

describe('## Category APIs', function () {
  var category = new _category2.default({
    name: 'Category Test',
    slug: 'test-2'
  });

  describe('# POST /api/categories', function () {
    it('should create a new category', function (done) {
      (0, _supertestAsPromised2.default)(_index2.default).post('/api/categories').send(category).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.name).to.equal(category.name);
        (0, _chai.expect)(res.body.slug).to.equal(category.slug);
        category = res.body;
        done();
      }).catch(done);
    });
  });

  describe('test  -   ' + category._id, function () {
    it('should get category details', function (done) {
      (0, _supertestAsPromised2.default)(_index2.default).get('/api/categories/' + category._id).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.name).to.equal(category.name);
        (0, _chai.expect)(res.body.slug).to.equal(category.slug);
        done();
      }).catch(done);
    });

    it('should report error with message - Not found, when category does not exists', function (done) {
      (0, _supertestAsPromised2.default)(_index2.default).get('/api/categories/56c787ccc67fc16ccc1a5e92').expect(_httpStatus2.default.NOT_FOUND).then(function (res) {
        (0, _chai.expect)(res.body.message).to.equal('Not Found');
        done();
      }).catch(done);
    });
  });

  // describe('# PUT /api/categories/:categoryId', () => {
  //   it('should update category details', (done) => {
  //     category.name = 'KK';
  //     request(app)
  //       .put(`/api/categories/${category._id}`)
  //       .send(category)
  //       .expect(httpStatus.OK)
  //       .then((res) => {
  //         expect(res.body.name).to.equal('KK');
  //         expect(res.body.slug).to.equal(category.slug);
  //         done();
  //       })
  //       .catch(done);
  //   });
  // });

  describe('# GET /api/categories/', function () {
    it('should get all categories', function (done) {
      (0, _supertestAsPromised2.default)(_index2.default).get('/api/categories').expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body).to.be.an('array');
        done();
      }).catch(done);
    });

    it('should get all categories (with limit and skip)', function (done) {
      (0, _supertestAsPromised2.default)(_index2.default).get('/api/categories').query({ limit: 10, skip: 1 }).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body).to.be.an('array');
        done();
      }).catch(done);
    });
  });

  describe('# DELETE /api/categories/', function () {
    it('should delete category', function (done) {
      (0, _supertestAsPromised2.default)(_index2.default).delete('/api/categories/' + category._id).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.name).to.equal(category.name);
        (0, _chai.expect)(res.body.slug).to.equal(category.slug);
        done();
      }).catch(done);
    });
  });
});
//# sourceMappingURL=category.test.js.map
