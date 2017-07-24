/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import User from '../models/user.model';
import config from '../../config/config';

/**
 * Load user and append to req.
 */
const load = async(req, res, next, id) => {
  if (req.user.role === 'admin' || id === req.user.id) {
    try {
      const user = await User.get(id);
      req.user = user; // eslint-disable-line no-param-reassign
      return next();
    } catch (err) {
      const error = new APIError('Something went wrong when loading user', httpStatus.INTERNAL_SERVER_ERROR, true);
      return next(error);
    }
  } else {
    const error = new APIError('You don\'t have enough permissions', httpStatus.FORBIDDEN, true);
    return next(error);
  }
};

/**
 * Get user
 * @returns {User}
 */
const get = async(req, res) => await res.json(req.user);

/**
 * Create new user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
const create = async(req, res, next) => {
  try {
    const getUser = await User.findOne({ email: req.body.email, userType: req.body.userType });
    if (getUser) {
      return res.json({ success: false, message: 'User already exists', data: '' });
    }

    // eslint-disable-next-line no-param-reassign
    req.body.role = 'customer';

    // Trying to save
    const user = new User(req.body);
    try {
      const savedUser = await user.save();

      const returnObj = {
        success: true,
        message: '',
        data: {}
      };
      const jwtAccessToken = jwt.sign(savedUser, config.jwtSecret);
      returnObj.data.jwtAccessToken = `JWT ${jwtAccessToken}`;
      returnObj.data.user = savedUser;
      returnObj.message = 'User created successfully';
      return res.json(returnObj);
    } catch (err1) {
      const error = new APIError('Failed to save user', httpStatus.INTERNAL_SERVER_ERROR, true);
      return next(error);
    }
  } catch (err) {
    const error = new APIError('Failed to check if user exists or not', httpStatus.INTERNAL_SERVER_ERROR, true);
    return next(error);
  }
};

/**
 * Add any type of user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
const add = async(req, res, next) => {
  try {
    const getUser = await User.findOne({ email: req.body.email, userType: req.body.userType });
    if (getUser) {
      return res.json({ success: false, message: 'User already exists', data: '' });
    }

    // eslint-disable-next-line no-param-reassign
    if (req.user.role !== 'admin') { req.body.role = 'customer'; }

    // Trying to save
    const user = new User(req.body);
    try {
      const savedUser = await user.save();

      const returnObj = {
        success: true,
        message: '',
        data: {}
      };
      const jwtAccessToken = jwt.sign(savedUser, config.jwtSecret);
      returnObj.data.jwtAccessToken = `JWT ${jwtAccessToken}`;
      returnObj.data.user = savedUser;
      returnObj.message = 'User added successfully';
      return res.json(returnObj);
    } catch (err1) {
      const error = new APIError('Failed to save user', httpStatus.INTERNAL_SERVER_ERROR, true);
      return next(error);
    }
  } catch (err) {
    const error = new APIError('Failed to check if user exists or not', httpStatus.INTERNAL_SERVER_ERROR, true);
    return next(error);
  }
};

/**
 * Update existing user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
const update = async(req, res, next) => {
  try {
    const user = req.user;
    user.email = req.body.email ? req.body.email : user.email;
    user.password = req.body.password ? req.body.password : req.body.password;
    const savedUser = await user.save();
    return res.json(savedUser);
  } catch (err) {
    const error = new APIError('Failed to update user', httpStatus.INTERNAL_SERVER_ERROR, true);
    return next(error);
  }
};

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
const list = async(req, res, next) => {
  const { limit = 50, skip = 0 } = req.query;
  try {
    const listOfUsers = await User.list({ limit, skip });
    res.json(listOfUsers);
  } catch (err) {
    const error = new APIError('Failed to get list of users', httpStatus.INTERNAL_SERVER_ERROR, true);
    return next(error);
  }
};

/**
 * Delete user.
 * @returns {User}
 */
const remove = async(req, res, next) => {
  const user = req.user;
  try {
    const removedUser = await user.remove();
    res.json(removedUser);
  } catch (err) {
    const error = new APIError('Failed to remove user', httpStatus.INTERNAL_SERVER_ERROR, true);
    return next(error);
  }
};

export default { load, get, create, add, update, list, remove };
