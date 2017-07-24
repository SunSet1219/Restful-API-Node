'use strict';

var _supertestAsPromised = require('supertest-as-promised');

var _supertestAsPromised2 = _interopRequireDefault(_supertestAsPromised);

var _httpStatus = require('http-status');

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _index = require('../../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.config.includeStack = true;

// Test for homepage to check status, health
describe('### Home check', function () {
  describe('#GET /', function () {
    it('should return OK', function (done) {
      (0, _supertestAsPromised2.default)(_index2.default).get('/').expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.text).to.equal('OK');
        done();
      }).catch(done);
    });
  });
});

describe('## Misc', function () {
  describe('# GET /api/health-check', function () {
    it('should return OK', function (done) {
      (0, _supertestAsPromised2.default)(_index2.default).get('/api/health-check').expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.text).to.equal('OK');
        done();
      }).catch(done);
    });
  });

  describe('# GET /api/404', function () {
    it('should return 404 status', function (done) {
      (0, _supertestAsPromised2.default)(_index2.default).get('/api/404').expect(_httpStatus2.default.NOT_FOUND).then(function (res) {
        (0, _chai.expect)(res.body.message).to.equal('Not Found');
        done();
      }).catch(done);
    });
  });

  // describe('# Error Handling', () => {
  //   it('should handle mongoose CastError - Cast to ObjectId failed', (done) => {
  //     request(app)
  //       .get('/api/users/56z787zzz67fc')
  //       .expect(httpStatus.INTERNAL_SERVER_ERROR)
  //       .then((res) => {
  //         expect(res.body.message).to.equal('Internal Server Error');
  //         done();
  //       })
  //       .catch(done);
  //   });
  //
  //   it('should handle express validation error - username is required', (done) => {
  //     request(app)
  //       .post('/api/users')
  //       .send({
  //         mobileNumber: '1234567890'
  //       })
  //       .expect(httpStatus.BAD_REQUEST)
  //       .then((res) => {
  //         expect(res.body.message).to.equal('"username" is required');
  //         done();
  //       })
  //       .catch(done);
  //   });
  // });
});
//# sourceMappingURL=misc.test.js.map
