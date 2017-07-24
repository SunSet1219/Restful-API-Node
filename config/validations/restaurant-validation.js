import Joi from 'joi';

export default {
  // POST api/restaurants
  createRestaurant: {
    body: {
      name: Joi.string().required(),
      seo_keyword: Joi.string(),
      seo_description: Joi.string(),
      long_description: Joi.string(),
      slug: Joi.string().required(),
      country: Joi.string().required(),
      city: Joi.string().required(),
      working_hours: Joi.object().keys({
        start: Joi.string(),
        end: Joi.string()
      }),
      restaurant_category: Joi.string().required(),
      cuisine: Joi.string(),
      logo: Joi.string(),
      address: Joi.string().required(),
      map_long: Joi.string(),
      map_lang: Joi.string(),
      status: Joi.boolean()
    }
  },

  // PUT api/restaurants/restauarntId
  updateRestaurant: {
    body: {
      name: Joi.string().required(),
      seo_keyword: Joi.string(),
      seo_description: Joi.string(),
      long_description: Joi.string(),
      slug: Joi.string().required(),
      country: Joi.string().required(),
      city: Joi.string().required(),
      working_hours: Joi.object().keys({
        start: Joi.string(),
        end: Joi.string()
      }),
      restaurant_category: Joi.string().required(),
      cuisine: Joi.string(),
      logo: Joi.string(),
      address: Joi.string().required(),
      map_long: Joi.string(),
      map_lang: Joi.string(),
      status: Joi.boolean()
    }
  },

  // GET api/restaurants/:restauarntId
  getRestauarntById: {
    params: {
      restaurantId: Joi.string().hex().required()
    }
  }
};
