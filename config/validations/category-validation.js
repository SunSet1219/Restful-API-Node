import Joi from 'joi';

export default {
  // POST api/categories
  createCategory: {
    body: {
      name: Joi.string().required(),
      keyword: Joi.string(),
      description: Joi.string(),
      slug: Joi.string().required(),
      image: Joi.string(),
      status: Joi.boolean()
    }
  },

  // PUT api/categories/categoryId
  updateCategory: {
    body: {
      name: Joi.string().required(),
      keyword: Joi.string(),
      description: Joi.string(),
      slug: Joi.string().required(),
      image: Joi.string(),
      status: Joi.boolean()
    }
  },

  // GET api/categories/:categoryId
  getCategoryById: {
    params: {
      categoryId: Joi.string().hex().required()
    }
  }
};
