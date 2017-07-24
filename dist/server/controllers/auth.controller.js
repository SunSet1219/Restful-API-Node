'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _httpStatus = require('http-status');

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _APIError = require('../helpers/APIError');

var _APIError2 = _interopRequireDefault(_APIError);

var _user = require('../models/user.model');

var _user2 = _interopRequireDefault(_user);

var _config = require('../../config/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
// eslint-disable-next-line consistent-return
var login = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
    var userObj, user, err, error;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            userObj = {
              email: req.body.email
            };
            _context.prev = 1;
            _context.next = 4;
            return _user2.default.findOne(userObj, '+password');

          case 4:
            user = _context.sent;

            if (user) {
              _context.next = 8;
              break;
            }

            err = new _APIError2.default('Authentication error', _httpStatus2.default.UNAUTHORIZED);
            return _context.abrupt('return', next(err));

          case 8:
            _context.next = 10;
            return user.comparePassword(req.body.password, function (passwordError, isMatch) {
              if (passwordError || !isMatch) {
                var _err = new _APIError2.default('Authentication error', _httpStatus2.default.UNAUTHORIZED);
                return next(_err);
              }
              var token = _jsonwebtoken2.default.sign(user, _config2.default.jwtSecret);

              _user2.default.findOneAndUpdate({ _id: user._id }, { $set: user }, { new: true }).then(function (updatedUser) {
                var returnObj = {
                  success: true,
                  message: 'User successfully logged in!',
                  data: {
                    jwtAccessToken: 'JWT ' + token,
                    user: updatedUser
                  }
                };
                res.json(returnObj);
              }).error(function (err123) {
                var err = new _APIError2.default('error in updating user details while login ' + err123, _httpStatus2.default.INTERNAL_SERVER_ERROR);
                next(err);
              });
            });

          case 10:
            _context.next = 16;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context['catch'](1);
            error = new _APIError2.default('erro while finding user ' + _context.t0, _httpStatus2.default.INTERNAL_SERVER_ERROR);

            next(error);

          case 16:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[1, 12]]);
  }));

  return function login(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

/** This is a protected route. Change login status to false and send success message.
 * @param req
 * @param res
 * @param next
 * @returns success message
 */
/* eslint-disable max-len */
function logout(req, res, next) {
  var userObj = req.user;
  if (userObj === undefined || userObj === null) {
    // console.log('user obj is null or undefined inside logout function', userObj);
  }
  _user2.default.findOneAndUpdate({ _id: userObj._id }, { $set: userObj }, { new: true }, function (err, userDoc) {
    if (err) {
      // console.log('error is here...............');
      var error = new _APIError2.default('error while updateing login status', _httpStatus2.default.INTERNAL_SERVER_ERROR);
      next(error);
    }
    if (userDoc) {
      var returnObj = {
        success: true,
        message: 'user logout successfully'
      };
      res.json(returnObj);
    } else {
      // console.log('error is here');
      var _error = new _APIError2.default('user not found', _httpStatus2.default.NOT_FOUND);
      next(_error);
    }
  });
}

/**
 * This is a protected route. Will return random number only if jwt token is provided in header.
 * @param req
 * @param res
 * @returns {*}
 */
function getRandomNumber(req, res) {
  // req.user is assigned by jwt middleware if valid token is provided
  return res.json({
    user: req.user,
    num: Math.random() * 100
  });
}

exports.default = { login: login, getRandomNumber: getRandomNumber, logout: logout };
//# sourceMappingURL=auth.controller.js.map
