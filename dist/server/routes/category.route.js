'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _category = require('../controllers/category.controller');

var _category2 = _interopRequireDefault(_category);

var _categoryValidation = require('../../config/validations/category-validation');

var _categoryValidation2 = _interopRequireDefault(_categoryValidation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // eslint-disable-line new-cap

router.route('/')
/** GET /api/categories - Get list of categories */
.get(_category2.default.list)

/** POST /api/categories - Create new category */
.post((0, _expressValidation2.default)(_categoryValidation2.default.createCategory), _category2.default.create);

router.route('/:categoryId')
/** GET /api/categories/:categoryId - Get category */
.get((0, _expressValidation2.default)(_categoryValidation2.default.getCategoryById), _category2.default.get)

/** PUT /api/categories/categoryId - update current category */
.put((0, _expressValidation2.default)(_categoryValidation2.default.updateCategory), _category2.default.update)

/** DELETE /api/categories/:categoryId - remove category */
.delete((0, _expressValidation2.default)(_categoryValidation2.default.getCategoryById), _category2.default.remove);

exports.default = router;
//# sourceMappingURL=category.route.js.map
