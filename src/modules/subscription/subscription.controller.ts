import { NextFunction, Request, Response } from 'express';
import * as SubscriptionService from './subscription.service';

export async function getCustomerInfo(req: Request, res: Response, next: NextFunction) {
	const { phoneNumber } = req.params;

	try {
		const result = await SubscriptionService.getCustomerInfo(phoneNumber);
		return res.send(result);
	} catch (e) {
		return next(e);
	}
}

export async function getSubscriptionOrders(req: Request, res: Response, next: NextFunction) {
	const { subscriptionId } = req.params;

	try {
		const result = await SubscriptionService.getSubscriptionOrders(subscriptionId);
		return res.send(result);
	} catch (e) {
		return next(e);
	}
}
