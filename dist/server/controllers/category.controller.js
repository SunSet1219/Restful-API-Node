'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _httpStatus = require('http-status');

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _APIError = require('../helpers/APIError');

var _APIError2 = _interopRequireDefault(_APIError);

var _category = require('../models/category.model');

var _category2 = _interopRequireDefault(_category);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get category
 * @returns {Category}
 */
var get = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
    var category, error;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _category2.default.get(req.params.categoryId);

          case 3:
            category = _context.sent;
            return _context.abrupt('return', res.json(category));

          case 7:
            _context.prev = 7;
            _context.t0 = _context['catch'](0);
            error = new _APIError2.default('Not Found', _httpStatus2.default.NOT_FOUND, true);
            return _context.abrupt('return', next(error));

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 7]]);
  }));

  return function get(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Get categories
 * @returns {Categories}
 */
var list = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res, next) {
    var _req$query, _req$query$limit, limit, _req$query$skip, skip, categories, error;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$query = req.query, _req$query$limit = _req$query.limit, limit = _req$query$limit === undefined ? 50 : _req$query$limit, _req$query$skip = _req$query.skip, skip = _req$query$skip === undefined ? 0 : _req$query$skip;
            _context2.prev = 1;
            _context2.next = 4;
            return _category2.default.list({ limit: limit, skip: skip });

          case 4:
            categories = _context2.sent;
            return _context2.abrupt('return', res.json(categories));

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2['catch'](1);
            error = new _APIError2.default('Failed to get list', _httpStatus2.default.NOT_FOUND, true);
            return _context2.abrupt('return', next(error));

          case 12:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[1, 8]]);
  }));

  return function list(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Create new category
 * @property {string} req.body.name - The name of category.
 * @property {string} req.body.keyword - The keywords of category.
 * @property {string} req.body.description - The description of category.
 * @property {string} req.body.slug - The slug of category.
 * @property {string} req.body.image - The image of category.
 * @property {string} req.body.status - The status of category.
 * @property {string} req.body.createdAt - The createdAt of category.
 * @property {string} req.body.updatedAt - The updatedAt of category.
 * @returns {Category}
 */
var create = function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(req, res, next) {
    var category, savedCategory, error;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            category = new _category2.default(req.body);
            _context3.prev = 1;
            _context3.next = 4;
            return category.save();

          case 4:
            savedCategory = _context3.sent;
            return _context3.abrupt('return', res.json(savedCategory));

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3['catch'](1);
            error = new _APIError2.default('Failed to create', _httpStatus2.default.NOT_FOUND, true);
            return _context3.abrupt('return', next(error));

          case 12:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[1, 8]]);
  }));

  return function create(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * Update category
 * @property {categoryId} req.params.categoryId
 * @returns {Category}
 */
var update = function () {
  var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(req, res, next) {
    var category, error;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _category2.default.findOneAndUpdate(req.params.categoryId, req.body, {
              new: true
              // runValidators: true,
              // upsert: true,
              // context: 'query'
            });

          case 3:
            category = _context4.sent;
            return _context4.abrupt('return', res.json(category));

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4['catch'](0);
            error = new _APIError2.default('Failed to update', _httpStatus2.default.INTERNAL_SERVER_ERROR, true);
            return _context4.abrupt('return', next(error));

          case 11:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[0, 7]]);
  }));

  return function update(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

var remove = function () {
  var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(req, res, next) {
    var category, data, error;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _category2.default.get(req.params.categoryId);

          case 3:
            category = _context5.sent;
            _context5.next = 6;
            return category.remove();

          case 6:
            data = _context5.sent;
            return _context5.abrupt('return', res.json(data));

          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5['catch'](0);
            error = new _APIError2.default('Failed to remove', _httpStatus2.default.NOT_FOUND, true);
            return _context5.abrupt('return', next(error));

          case 14:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[0, 10]]);
  }));

  return function remove(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();

exports.default = { get: get, list: list, create: create, update: update, remove: remove };
//# sourceMappingURL=category.controller.js.map
