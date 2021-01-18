import { Connection } from 'mysql';
import { asyncQuery } from './modules/utility';

const tableNames = {
	subscriptions: 'subscriptions',
	products: 'products',
	orders: 'orders',
	order_products: 'order_products',
};

export default async (connection: Connection) => {
	await asyncQuery(
		connection,
		`
  insert into ${tableNames.subscriptions} (
  subscriptionId,fullname,address,locationName,subCityName,cityName,brand,phoneNumber,distributorNumber
  ) values ?`,
		[
			[
				['abc123', 'Utku', 'sair nefi sokak', 'caferaga', 'kadiköy', 'istanbul', 'hayat', '5332858530', '2161000000'],
				['abc124', 'Utku', 'sair nefi sokak', 'caferaga', 'kadiköy', 'istanbul', 'sirma', '5332858530', '2161000004'],
				['abc125', 'Ozan', 'bahariye sokak', 'caddebostan', 'kadiköy', 'istanbul', 'erikli', '5331533630', '2161000001'],
				['abc126', 'Ergin', 'moda caddesi', 'göztepe', 'kadiköy', 'istanbul', 'sirma', '5332858530', '2161000002'],
			],
		]
	);

	await asyncQuery(
		connection,
		`
  insert into ${tableNames.orders} (
  orderId,subscriptionId,deliveryDate ,paymentMethod,totalAmount,status
  ) values ?`,
		[
			[
				['1', 'abc123', '2017-05-02 00:13', 'BKM', '10.0', 'NEW'],
				['2', 'abc123', '2017-04-23 20:05', 'MASTERPASS', '24.0', 'CONFIRMED'],
				['3', 'abc123', '2017-03-31 16:35', 'PAYATDOOR', '12.0', 'CANCELED'],
				['4', 'abc125', '2017-03-29 11:19', 'PAYATDOOR', '36.0', 'COMPLETED'],
				['5', 'abc125', '2017-03-23 17:59', 'BKM', '15.0', 'CONFIRMED'],
				['6', 'abc126', '2017-03-09 19:02', 'MASTERPASS', '32.5', 'CANCELED'],
			],
		]
	);

	await asyncQuery(
		connection,
		`
  insert into ${tableNames.products} (
  productId,description
  ) values ?`,
		[
			[
				['1', '19 lt damanaca'],
				['2', '5 lt pet'],
				['3', '10 lt pet'],
			],
		]
	);

	await asyncQuery(
		connection,
		`
    insert into ${tableNames.order_products} (
    orderId,productId,quantity
    ) values ?`,
		[
			[
				['1', '1', '1'],
				['2', '1', '1'],
				['2', '3', '2'],
				['3', '1', '2'],
				['4', '1', '3'],
				['5', '2', '2'],
				['6', '1', '1'],
				['6', '2', '3'],
			],
		]
	);
};
