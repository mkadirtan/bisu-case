import { asyncQuery } from '../utility';
import connection from '../../db';
import { groupBy, map, omit } from 'lodash';
import SubscriptionErrors from './subscription.errors';

export async function getCustomerInfo(phoneNumber: string) {
	const { result = [] } = await asyncQuery(
		connection,
		`
  SELECT s.*
  FROM subscriptions AS s
  WHERE s.phoneNumber = ?
  `,
		[phoneNumber]
	);

	if (result.length === 0) {
		throw SubscriptionErrors.NO_RECORD_WITH_PHONE;
	}

	return result;
}

export async function getSubscriptionOrders(subscriptionId: string) {
	const { result = [] } = await asyncQuery(
		connection,
		`
  SELECT o.*, p.description, op.quantity
  FROM orders AS o
  JOIN order_products AS op ON op.orderId = o.orderId
  JOIN products AS p ON p.productId = op.productId
  WHERE o.subscriptionId = ?
  `,
		[subscriptionId]
	);

	if (result.length === 0) {
		throw SubscriptionErrors.NO_RECORD_WITH_SUB_ID;
	}

	// Eminim bu iş SQL ile yapılabiliyor, ancak benim SQL bilgim yetmediği için
	// bu şekilde çözerek ilerledim.
	const grouped = groupBy(result, ({ orderId }) => orderId);
	return map(grouped, (_orders) => {
		const base = omit(_orders[0], 'description', 'quantity');
		base.products = map(_orders, ({ description, quantity }) => ({
			productName: description,
			quantity: quantity,
		}));
		return base;
	});
}
