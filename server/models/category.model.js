import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Category Schema
 */
const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  keyword: {
    type: String,
  },
  description: {
    type: String,
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String
  },
  status: {
    type: Boolean
  },
  permissions: {
    write: [
      'admin'
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

// Category Pre Save Hook for updatedAt time
CategorySchema.pre('findOneAndUpdate', function(next) {
  const cat = this.getUpdate();
  cat.updatedAt = new Date();
  next();
});

 /**
  * Statics
  */
CategorySchema.statics = {
   /**
    * Get category
    * @param {ObjectId} id - The objectId of category.
    * @returns {Promise<Category, APIError>}
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
    * List categories in descending order of 'createdAt' timestamp.
    * @param {number} skip - Number of categories to be skipped.
    * @param {number} limit - Limit number of categories to be returned.
    * @returns {Promise<Category[]>}
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
  * @typedef User
  */
export default mongoose.model('Category', CategorySchema);
