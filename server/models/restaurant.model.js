import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Restaurant Schema
 */
const RestaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  seo_keyword: {
    type: String,
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
    write: [
      'admin',
      'restaurant_owner'
    ],
    read: [
      'admin',
      'restaurant_owner',
      'customer',
      'driver'
    ]
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
RestaurantSchema.pre('findOneAndUpdate', function(next) {
  const cat = this.getUpdate();
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
  get(id) {
    return this.findById(id)
      .exec()
      .then((user) => {
        if (user) {
          return user;
        }
        const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List restaurants in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of restaurants to be skipped.
   * @param {number} limit - Limit number of restaurants to be returned.
   * @returns {Promise<Restaurants[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef Restaurant
 */
export default mongoose.model('Restaurant', RestaurantSchema);
