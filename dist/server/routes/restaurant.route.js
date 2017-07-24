'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _restaurant = require('../controllers/restaurant.controller');

var _restaurant2 = _interopRequireDefault(_restaurant);

var _restaurantValidation = require('../../config/validations/restaurant-validation');

var _restaurantValidation2 = _interopRequireDefault(_restaurantValidation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // eslint-disable-line new-cap

router.route('/')
/** GET /api/restaurants - Get list of restaurants */
.get(_restaurant2.default.list)

/** POST /api/restaurants - Create new restaurant */
.post((0, _expressValidation2.default)(_restaurantValidation2.default.createRestaurant), _restaurant2.default.create);

router.route('/:restaurantId')
/** GET /api/restaurants/:restaurantId - Get restaurant */
.get((0, _expressValidation2.default)(_restaurantValidation2.default.getRestauarntById), _restaurant2.default.get)

/** PUT /api/restaurants/:restaurantId - update current restaurant */
.put((0, _expressValidation2.default)(_restaurantValidation2.default.updateRestaurant), _restaurant2.default.update)

/** DELETE /api/restaurant/:restaurantId - remove restaurant */
.delete((0, _expressValidation2.default)(_restaurantValidation2.default.getRestauarntById), _restaurant2.default.remove);

exports.default = router;
//# sourceMappingURL=restaurant.route.js.map
