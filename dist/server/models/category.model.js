'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _httpStatus = require('http-status');

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _APIError = require('../helpers/APIError');

var _APIError2 = _interopRequireDefault(_APIError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Category Schema
 */
var CategorySchema = new _mongoose2.default.Schema({
  name: {
    type: String,
    required: true
  },
  keyword: {
    type: String
  },
  description: {
    type: String
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String
  },
  status: {
    type: Boolean
  },
  permissions: {
    write: ['admin'],
    read: ['admin', 'restaurant_owner', 'customer', 'driver']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Category Pre Save Hook for updatedAt time
CategorySchema.pre('findOneAndUpdate', function (next) {
  var cat = this.getUpdate();
  cat.updatedAt = new Date();
  next();
});

/**
 * Statics
 */
CategorySchema.statics = {
  /**
   * Get category
   * @param {ObjectId} id - The objectId of category.
   * @returns {Promise<Category, APIError>}
   */
  get: function get(id) {
    return this.findById(id).exec().then(function (user) {
      if (user) {
        return user;
      }
      var err = new _APIError2.default('No such user exists!', _httpStatus2.default.NOT_FOUND);
      return _bluebird2.default.reject(err);
    });
  },


  /**
   * List categories in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of categories to be skipped.
   * @param {number} limit - Limit number of categories to be returned.
   * @returns {Promise<Category[]>}
   */
  list: function list() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$skip = _ref.skip,
        skip = _ref$skip === undefined ? 0 : _ref$skip,
        _ref$limit = _ref.limit,
        limit = _ref$limit === undefined ? 50 : _ref$limit;

    return this.find().sort({ createdAt: -1 }).skip(+skip).limit(+limit).exec();
  }
};

/**
 * @typedef User
 */
exports.default = _mongoose2.default.model('Category', CategorySchema);
//# sourceMappingURL=category.model.js.map
