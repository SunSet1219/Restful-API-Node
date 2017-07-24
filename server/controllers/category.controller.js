import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import Category from '../models/category.model';


/**
 * Get category
 * @returns {Category}
 */
const get = async(req, res, next) => {
  try {
    const category = await Category.get(req.params.categoryId);
    return res.json(category);
  } catch (err) {
    const error = new APIError('Not Found', httpStatus.NOT_FOUND, true);
    return next(error);
  }
};

/**
 * Get categories
 * @returns {Categories}
 */
const list = async(req, res, next) => {
  const { limit = 50, skip = 0 } = req.query;

  try {
    const categories = await Category.list({ limit, skip });
    // Below 2 lines are for teesting frontend API during load
    // const waitTill = new Date(new Date().getTime() + (5 * 1000));
    // while (waitTill > new Date()) { /* some data */ }
    return res.json(categories);
  } catch (err) {
    const error = new APIError('Failed to get list', httpStatus.NOT_FOUND, true);
    return next(error);
  }
};

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
const create = async(req, res, next) => {
  const category = new Category(req.body);

  try {
    const savedCategory = await category.save();
    return res.json(savedCategory);
  } catch (err) {
    const error = new APIError('Failed to create', httpStatus.NOT_FOUND, true);
    return next(error);
  }
};

/**
 * Update category
 * @property {categoryId} req.params.categoryId
 * @returns {Category}
 */
const update = async(req, res, next) => {
  try {
    const category = await Category.findOneAndUpdate(req.params.categoryId, req.body, {
      new: true,
      // runValidators: true,
      // upsert: true,
      // context: 'query'
    });
    return res.json(category);
  } catch (err) {
    const error = new APIError('Failed to update', httpStatus.INTERNAL_SERVER_ERROR, true);
    return next(error);
  }
};


const remove = async(req, res, next) => {
  try {
    const category = await Category.get(req.params.categoryId);
    const data = await category.remove();
    return res.json(data);
  } catch (err) {
    const error = new APIError('Failed to remove', httpStatus.NOT_FOUND, true);
    return next(error);
  }
};

export default { get, list, create, update, remove };
