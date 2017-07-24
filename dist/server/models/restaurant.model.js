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
 * Restaurant Schema
 */
var RestaurantSchema = new _mongoose2.default.Schema({
  name: {
    type: String,
    required: true
  },
  seo_keyword: {
    type: String
  },
  seo_description: {
    type: String
  },
  long_description: {
    type: String
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  country: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  working_hours: {
    start: {
      type: Date
    },
    end: {
      type: Date
    }
  },
  restaurant_category: {
    type: String,
    required: true
  },
  cuisine: {
    type: String
  },
  logo: {
    type: String
  },
  address: {
    type: String,
    required: true
  },
  map_long: {
    type: String
  },
  map_lang: {
    type: String
  },
  status: {
    type: Boolean
  },
  permissions: {
    write: ['admin', 'restaurant_owner'],
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

// Restaurant Pre Save Hook for updatedAt time
RestaurantSchema.pre('findOneAndUpdate', function (next) {
  var cat = this.getUpdate();
  cat.updatedAt = new Date();
  next();
});

/**
 * Statics
 */
RestaurantSchema.statics = {
  /**
   * Get restaurant
   * @param {ObjectId} id - The objectId of category.
   * @returns {Promise<Restaurant, APIError>}
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
   * List restaurants in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of restaurants to be skipped.
   * @param {number} limit - Limit number of restaurants to be returned.
   * @returns {Promise<Restaurants[]>}
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
 * @typedef Restaurant
 */
exports.default = _mongoose2.default.model('Restaurant', RestaurantSchema);
//# sourceMappingURL=restaurant.model.js.map
