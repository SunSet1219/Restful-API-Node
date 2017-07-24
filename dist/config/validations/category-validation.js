'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  // POST api/categories
  createCategory: {
    body: {
      name: _joi2.default.string().required(),
      keyword: _joi2.default.string(),
      description: _joi2.default.string(),
      slug: _joi2.default.string().required(),
      image: _joi2.default.string(),
      status: _joi2.default.boolean()
    }
  },

  // PUT api/categories/categoryId
  updateCategory: {
    body: {
      name: _joi2.default.string().required(),
      keyword: _joi2.default.string(),
      description: _joi2.default.string(),
      slug: _joi2.default.string().required(),
      image: _joi2.default.string(),
      status: _joi2.default.boolean()
    }
  },

  // GET api/categories/:categoryId
  getCategoryById: {
    params: {
      categoryId: _joi2.default.string().hex().required()
    }
  }
};
//# sourceMappingURL=category-validation.js.map
