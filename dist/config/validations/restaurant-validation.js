'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  // POST api/restaurants
  createRestaurant: {
    body: {
      name: _joi2.default.string().required(),
      seo_keyword: _joi2.default.string(),
      seo_description: _joi2.default.string(),
      long_description: _joi2.default.string(),
      slug: _joi2.default.string().required(),
      country: _joi2.default.string().required(),
      city: _joi2.default.string().required(),
      working_hours: _joi2.default.object().keys({
        start: _joi2.default.string(),
        end: _joi2.default.string()
      }),
      restaurant_category: _joi2.default.string().required(),
      cuisine: _joi2.default.string(),
      logo: _joi2.default.string(),
      address: _joi2.default.string().required(),
      map_long: _joi2.default.string(),
      map_lang: _joi2.default.string(),
      status: _joi2.default.boolean()
    }
  },

  // PUT api/restaurants/restauarntId
  updateRestaurant: {
    body: {
      name: _joi2.default.string().required(),
      seo_keyword: _joi2.default.string(),
      seo_description: _joi2.default.string(),
      long_description: _joi2.default.string(),
      slug: _joi2.default.string().required(),
      country: _joi2.default.string().required(),
      city: _joi2.default.string().required(),
      working_hours: _joi2.default.object().keys({
        start: _joi2.default.string(),
        end: _joi2.default.string()
      }),
      restaurant_category: _joi2.default.string().required(),
      cuisine: _joi2.default.string(),
      logo: _joi2.default.string(),
      address: _joi2.default.string().required(),
      map_long: _joi2.default.string(),
      map_lang: _joi2.default.string(),
      status: _joi2.default.boolean()
    }
  },

  // GET api/restaurants/:restauarntId
  getRestauarntById: {
    params: {
      restaurantId: _joi2.default.string().hex().required()
    }
  }
};
//# sourceMappingURL=restaurant-validation.js.map
