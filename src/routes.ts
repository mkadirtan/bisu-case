import { Router } from 'express';
import SubscriptionRouter from './modules/subscription/subscription.router';

const router: Router = Router();
router.use(SubscriptionRouter);

export default router;
