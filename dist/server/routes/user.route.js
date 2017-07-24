'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _httpStatus = require('http-status');

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _paramValidation = require('../../config/param-validation');

var _paramValidation2 = _interopRequireDefault(_paramValidation);

var _user = require('../controllers/user.controller');

var _user2 = _interopRequireDefault(_user);

var _config = require('../../config/config');

var _config2 = _interopRequireDefault(_config);

var _APIError = require('../helpers/APIError');

var _APIError2 = _interopRequireDefault(_APIError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // eslint-disable-line new-cap

/** POST /api/users/register - create new user and return corresponding user object and token*/
router.route('/register').post((0, _expressValidation2.default)(_paramValidation2.default.createUser), _user2.default.create);

// MiddleWare.....

router.use(function (req, res, next) {
  // eslint-disable-next-line consistent-return
  _passport2.default.authenticate('jwt', _config2.default.passportOptions, function (error, userDtls, info) {
    if (error) {
      var err = new _APIError2.default('token not matched', _httpStatus2.default.INTERNAL_SERVER_ERROR);
      return next(err);
    } else if (userDtls) {
      // eslint-disable-next-line no-param-reassign
      req.user = userDtls;
      next();
    } else {
      var _err = new _APIError2.default('token not matched ' + info, _httpStatus2.default.UNAUTHORIZED);
      return next(_err);
    }
  })(req, res, next);
});

router.route('/')
/** GET /api/users - Get list of users */
.get(_user2.default.get).post(_user2.default.add);

router.route('/:userId')
/** GET /api/users/:userId - Get user */
.get(_user2.default.get)

/** PUT /api/users/:userId - Update user */
.put((0, _expressValidation2.default)(_paramValidation2.default.updateUser), _user2.default.update)

/** DELETE /api/users/:userId - Delete user */
.delete(_user2.default.remove);

/** Load user when API with userId route parameter is hit */
router.param('userId', _user2.default.load);

exports.default = router;
//# sourceMappingURL=user.route.js.map
