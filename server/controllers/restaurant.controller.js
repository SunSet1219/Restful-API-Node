import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import Restaurant from '../models/restaurant.model';

/**
 * Get restaurant
 * @returns {Restaurant}
 */
const get = async(req, res, next) => {
  try {
    const restaurant = await Restaurant.get(req.params.restaurantId);
    return res.json(restaurant);
  } catch (err) {
    const error = new APIError('Not Found', httpStatus.NOT_FOUND, true);
    return next(error);
  }
};

/**
 * Get restaurants
 * @returns {Restaurants}
 */
const list = async(req, res, next) => {
  const { limit = 50, skip = 0 } = req.query;

  try {
    const restaurants = await Restaurant.list({ limit, skip });
    return res.json(restaurants);
  } catch (err) {
    const error = new APIError('Failed to get list', httpStatus.NOT_FOUND, true);
    return next(error);
  }
};

/**
 * Create new restaurant
 * @returns {Restaurant}
 */
const create = async(req, res, next) => {
  const restaurant = new Restaurant(req.body);

  try {
    const savedRestaurant = await restaurant.save();
    return res.json(savedRestaurant);
  } catch (err) {
    const error = new APIError('Failed to create', httpStatus.NOT_FOUND, true);
    return next(error);
  }
};

/**
 * Update category
 * @property {restaurantId} req.params.categoryId
 * @returns {Restaurant}
 */
const update = async(req, res, next) => {
  // if (req.params.restaurantId === undefined) {
  //   return res.json({ t: req.params.id });
  // }
  // res.json({ v: req.params.id });

  try {
    const restaurant = await Restaurant.findOneAndUpdate(req.params.restaurantId, req.body, {
      new: true,
      // runValidators: true,
      // upsert: true,
      // context: 'query'
    });
    return res.json(restaurant);
  } catch (err) {
    const error = new APIError('Failed to update', httpStatus.INTERNAL_SERVER_ERROR, true);
    return next(error);
  }
};

/**
 * @param req
 * @param res
 * @param next
 * @returns {Promise.<Restaurant>}
 */
const remove = async(req, res, next) => {
  try {
    const restaurant = await Restaurant.get(req.params.restaurantId);
    const data = await restaurant.remove();
    return res.json(data);
  } catch (err) {
    const error = new APIError('Failed to remove', httpStatus.NOT_FOUND, true);
    return next(error);
  }
};

export default { get, list, create, update, remove };
