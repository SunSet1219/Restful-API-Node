import passportJWT from 'passport-jwt';
import config from './config';
import UserSchema from '../server/models/user.model';

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

function passportConfiguration(passport) {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  // opts.tokenQueryParameterName = ExtractJwt.fromUrlQueryParameter(auth_token);
  opts.secretOrKey = config.jwtSecret;
  passport.use(new JwtStrategy(opts, (jwtPayload, cb) => {
    UserSchema.findOne({ _id: jwtPayload._doc._id })
      .then(user => cb(null, user))
      .error(err => cb(err, false));
  }));
}
export default passportConfiguration;
