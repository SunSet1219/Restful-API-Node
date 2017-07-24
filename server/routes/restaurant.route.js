import express from 'express';
import validate from 'express-validation';
import restaurantCtrl from '../controllers/restaurant.controller';
import restaurantValidation from '../../config/validations/restaurant-validation';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/restaurants - Get list of restaurants */
  .get(restaurantCtrl.list)

  /** POST /api/restaurants - Create new restaurant */
  .post(validate(restaurantValidation.createRestaurant), restaurantCtrl.create);

router.route('/:restaurantId')
  /** GET /api/restaurants/:restaurantId - Get restaurant */
  .get(validate(restaurantValidation.getRestauarntById), restaurantCtrl.get)

  /** PUT /api/restaurants/:restaurantId - update current restaurant */
  .put(validate(restaurantValidation.updateRestaurant), restaurantCtrl.update)

  /** DELETE /api/restaurant/:restaurantId - remove restaurant */
  .delete(validate(restaurantValidation.getRestauarntById), restaurantCtrl.remove);

export default router;
