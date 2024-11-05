import { Router } from 'express';
import { logger } from '../utils/logger.utils';
import { post } from '../controllers/cart.controller';

const serviceRouter = Router();

serviceRouter.post('/', async (req, res, next) => {
  try {
    await post(req, res);
  } catch (error) {
    next(error);
  }
});

export default serviceRouter;
