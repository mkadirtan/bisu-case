import { Router } from 'express';
import * as SubscriptionController from './subscription.controller';

const router = Router();

router.get('/getCustomerInfo/:phoneNumber', SubscriptionController.getCustomerInfo);
router.post('/getSubscriptionOrders/:subscriptionId', SubscriptionController.getSubscriptionOrders);

export default router;
