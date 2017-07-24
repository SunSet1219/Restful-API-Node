import express from 'express';
import validate from 'express-validation';
import categoryCtrl from '../controllers/category.controller';
import categoryValidation from '../../config/validations/category-validation';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/categories - Get list of categories */
  .get(categoryCtrl.list)

  /** POST /api/categories - Create new category */
  .post(validate(categoryValidation.createCategory), categoryCtrl.create);

router.route('/:categoryId')
  /** GET /api/categories/:categoryId - Get category */
  .get(validate(categoryValidation.getCategoryById), categoryCtrl.get)

  /** PUT /api/categories/categoryId - update current category */
  .put(validate(categoryValidation.updateCategory), categoryCtrl.update)

  /** DELETE /api/categories/:categoryId - remove category */
  .delete(validate(categoryValidation.getCategoryById), categoryCtrl.remove);

export default router;
