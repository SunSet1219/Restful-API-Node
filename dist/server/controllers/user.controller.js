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
 * Load user and append to req.
 */
var load = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next, id) {
    var user, error, _error;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(req.user.role === 'admin' || id === req.user.id)) {
              _context.next = 15;
              break;
            }

            _context.prev = 1;
            _context.next = 4;
            return _user2.default.get(id);

          case 4:
            user = _context.sent;

            req.user = user; // eslint-disable-line no-param-reassign
            return _context.abrupt('return', next());

          case 9:
            _context.prev = 9;
            _context.t0 = _context['catch'](1);
            error = new _APIError2.default('Something went wrong when loading user', _httpStatus2.default.INTERNAL_SERVER_ERROR, true);
            return _context.abrupt('return', next(error));

          case 13:
            _context.next = 17;
            break;

          case 15:
            _error = new _APIError2.default('You don\'t have enough permissions', _httpStatus2.default.FORBIDDEN, true);
            return _context.abrupt('return', next(_error));

          case 17:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[1, 9]]);
  }));

  return function load(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Get user
 * @returns {User}
 */
/* eslint-disable consistent-return */
var get = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res) {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return res.json(req.user);

          case 2:
            return _context2.abrupt('return', _context2.sent);

          case 3:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function get(_x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Create new user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
var create = function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(req, res, next) {
    var getUser, user, savedUser, returnObj, jwtAccessToken, error, _error2;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _user2.default.findOne({ email: req.body.email, userType: req.body.userType });

          case 3:
            getUser = _context3.sent;

            if (!getUser) {
              _context3.next = 6;
              break;
            }

            return _context3.abrupt('return', res.json({ success: false, message: 'User already exists', data: '' }));

          case 6:

            // eslint-disable-next-line no-param-reassign
            req.body.role = 'customer';

            // Trying to save
            user = new _user2.default(req.body);
            _context3.prev = 8;
            _context3.next = 11;
            return user.save();

          case 11:
            savedUser = _context3.sent;
            returnObj = {
              success: true,
              message: '',
              data: {}
            };
            jwtAccessToken = _jsonwebtoken2.default.sign(savedUser, _config2.default.jwtSecret);

            returnObj.data.jwtAccessToken = 'JWT ' + jwtAccessToken;
            returnObj.data.user = savedUser;
            returnObj.message = 'User created successfully';
            return _context3.abrupt('return', res.json(returnObj));

          case 20:
            _context3.prev = 20;
            _context3.t0 = _context3['catch'](8);
            error = new _APIError2.default('Failed to save user', _httpStatus2.default.INTERNAL_SERVER_ERROR, true);
            return _context3.abrupt('return', next(error));

          case 24:
            _context3.next = 30;
            break;

          case 26:
            _context3.prev = 26;
            _context3.t1 = _context3['catch'](0);
            _error2 = new _APIError2.default('Failed to check if user exists or not', _httpStatus2.default.INTERNAL_SERVER_ERROR, true);
            return _context3.abrupt('return', next(_error2));

          case 30:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 26], [8, 20]]);
  }));

  return function create(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * Add any type of user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
var add = function () {
  var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(req, res, next) {
    var getUser, user, savedUser, returnObj, jwtAccessToken, error, _error3;

    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _user2.default.findOne({ email: req.body.email, userType: req.body.userType });

          case 3:
            getUser = _context4.sent;

            if (!getUser) {
              _context4.next = 6;
              break;
            }

            return _context4.abrupt('return', res.json({ success: false, message: 'User already exists', data: '' }));

          case 6:

            // eslint-disable-next-line no-param-reassign
            if (req.user.role !== 'admin') {
              req.body.role = 'customer';
            }

            // Trying to save
            user = new _user2.default(req.body);
            _context4.prev = 8;
            _context4.next = 11;
            return user.save();

          case 11:
            savedUser = _context4.sent;
            returnObj = {
              success: true,
              message: '',
              data: {}
            };
            jwtAccessToken = _jsonwebtoken2.default.sign(savedUser, _config2.default.jwtSecret);

            returnObj.data.jwtAccessToken = 'JWT ' + jwtAccessToken;
            returnObj.data.user = savedUser;
            returnObj.message = 'User added successfully';
            return _context4.abrupt('return', res.json(returnObj));

          case 20:
            _context4.prev = 20;
            _context4.t0 = _context4['catch'](8);
            error = new _APIError2.default('Failed to save user', _httpStatus2.default.INTERNAL_SERVER_ERROR, true);
            return _context4.abrupt('return', next(error));

          case 24:
            _context4.next = 30;
            break;

          case 26:
            _context4.prev = 26;
            _context4.t1 = _context4['catch'](0);
            _error3 = new _APIError2.default('Failed to check if user exists or not', _httpStatus2.default.INTERNAL_SERVER_ERROR, true);
            return _context4.abrupt('return', next(_error3));

          case 30:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[0, 26], [8, 20]]);
  }));

  return function add(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * Update existing user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
var update = function () {
  var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(req, res, next) {
    var user, savedUser, error;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            user = req.user;

            user.email = req.body.email ? req.body.email : user.email;
            user.password = req.body.password ? req.body.password : req.body.password;
            _context5.next = 6;
            return user.save();

          case 6:
            savedUser = _context5.sent;
            return _context5.abrupt('return', res.json(savedUser));

          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5['catch'](0);
            error = new _APIError2.default('Failed to update user', _httpStatus2.default.INTERNAL_SERVER_ERROR, true);
            return _context5.abrupt('return', next(error));

          case 14:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[0, 10]]);
  }));

  return function update(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
var list = function () {
  var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(req, res, next) {
    var _req$query, _req$query$limit, limit, _req$query$skip, skip, listOfUsers, error;

    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _req$query = req.query, _req$query$limit = _req$query.limit, limit = _req$query$limit === undefined ? 50 : _req$query$limit, _req$query$skip = _req$query.skip, skip = _req$query$skip === undefined ? 0 : _req$query$skip;
            _context6.prev = 1;
            _context6.next = 4;
            return _user2.default.list({ limit: limit, skip: skip });

          case 4:
            listOfUsers = _context6.sent;

            res.json(listOfUsers);
            _context6.next = 12;
            break;

          case 8:
            _context6.prev = 8;
            _context6.t0 = _context6['catch'](1);
            error = new _APIError2.default('Failed to get list of users', _httpStatus2.default.INTERNAL_SERVER_ERROR, true);
            return _context6.abrupt('return', next(error));

          case 12:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined, [[1, 8]]);
  }));

  return function list(_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}();

/**
 * Delete user.
 * @returns {User}
 */
var remove = function () {
  var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(req, res, next) {
    var user, removedUser, error;
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            user = req.user;
            _context7.prev = 1;
            _context7.next = 4;
            return user.remove();

          case 4:
            removedUser = _context7.sent;

            res.json(removedUser);
            _context7.next = 12;
            break;

          case 8:
            _context7.prev = 8;
            _context7.t0 = _context7['catch'](1);
            error = new _APIError2.default('Failed to remove user', _httpStatus2.default.INTERNAL_SERVER_ERROR, true);
            return _context7.abrupt('return', next(error));

          case 12:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined, [[1, 8]]);
  }));

  return function remove(_x19, _x20, _x21) {
    return _ref7.apply(this, arguments);
  };
}();

exports.default = { load: load, get: get, create: create, add: add, update: update, list: list, remove: remove };
//# sourceMappingURL=user.controller.js.map
