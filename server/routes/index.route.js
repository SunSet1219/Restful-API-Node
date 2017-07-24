import express from 'express';
import userRoutes from './user.route';
import authRoutes from './auth.route';
import categoryRoutes from './category.route';
import restaurantRoutes from './restaurant.route';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount user routes at /users
router.use('/users', userRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

// mount category routes at /categories
router.use('/categories', categoryRoutes);

// mount restaurant routes at restaurants
router.use('/restaurants', restaurantRoutes);


export default router;
