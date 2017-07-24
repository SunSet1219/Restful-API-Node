import mongoose from 'mongoose';
import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import app from '../../index';
import Category from '../models/category.model';

chai.config.includeStack = true;

/**
 * root level hooks
 */
after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe('## Category APIs', () => {
  let category = new Category({
    name: 'Category Test',
    slug: 'test-2'
  });

  describe('# POST /api/categories', () => {
    it('should create a new category', (done) => {
      request(app)
        .post('/api/categories')
        .send(category)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal(category.name);
          expect(res.body.slug).to.equal(category.slug);
          category = res.body;
          done();
        })
        .catch(done);
    });
  });

  describe(`test  -   ${category._id}`, () => {
    it('should get category details', (done) => {
      request(app)
        .get(`/api/categories/${category._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal(category.name);
          expect(res.body.slug).to.equal(category.slug);
          done();
        })
        .catch(done);
    });

    it('should report error with message - Not found, when category does not exists', (done) => {
      request(app)
        .get('/api/categories/56c787ccc67fc16ccc1a5e92')
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message).to.equal('Not Found');
          done();
        })
        .catch(done);
    });
  });

  // describe('# PUT /api/categories/:categoryId', () => {
  //   it('should update category details', (done) => {
  //     category.name = 'KK';
  //     request(app)
  //       .put(`/api/categories/${category._id}`)
  //       .send(category)
  //       .expect(httpStatus.OK)
  //       .then((res) => {
  //         expect(res.body.name).to.equal('KK');
  //         expect(res.body.slug).to.equal(category.slug);
  //         done();
  //       })
  //       .catch(done);
  //   });
  // });

  describe('# GET /api/categories/', () => {
    it('should get all categories', (done) => {
      request(app)
        .get('/api/categories')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });

    it('should get all categories (with limit and skip)', (done) => {
      request(app)
        .get('/api/categories')
        .query({ limit: 10, skip: 1 })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });
  });

  describe('# DELETE /api/categories/', () => {
    it('should delete category', (done) => {
      request(app)
        .delete(`/api/categories/${category._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal(category.name);
          expect(res.body.slug).to.equal(category.slug);
          done();
        })
        .catch(done);
    });
  });
});
