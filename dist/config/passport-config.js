'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _passportJwt = require('passport-jwt');

var _passportJwt2 = _interopRequireDefault(_passportJwt);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _user = require('../server/models/user.model');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ExtractJwt = _passportJwt2.default.ExtractJwt;
var JwtStrategy = _passportJwt2.default.Strategy;

function passportConfiguration(passport) {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  // opts.tokenQueryParameterName = ExtractJwt.fromUrlQueryParameter(auth_token);
  opts.secretOrKey = _config2.default.jwtSecret;
  passport.use(new JwtStrategy(opts, function (jwtPayload, cb) {
    _user2.default.findOne({ _id: jwtPayload._doc._id }).then(function (user) {
      return cb(null, user);
    }).error(function (err) {
      return cb(err, false);
    });
  }));
}
exports.default = passportConfiguration;
//# sourceMappingURL=passport-config.js.map
