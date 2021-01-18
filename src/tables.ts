import { Connection } from 'mysql';
import { asyncQuery } from './modules/utility';

const tableNames = {
	subscriptions: 'subscriptions',
	products: 'products',
	orders: 'orders',
	order_products: 'order_products',
};

export default async (connection: Connection) => {
	await asyncQuery(connection, `drop table if exists ${tableNames.order_products}`);
	await asyncQuery(connection, `drop table if exists ${tableNames.orders}`);
	await asyncQuery(connection, `drop table if exists ${tableNames.products}`);
	await asyncQuery(connection, `drop table if exists ${tableNames.subscriptions}`);

	await asyncQuery(
		connection,
		`
	create table if not exists ${tableNames.subscriptions}(
	subscriptionId varchar(10),
	fullname varchar(30),
	address varchar(200),
	locationName varchar(50),
	subCityName varchar(50),
	cityName varchar(50),
	brand varchar(20),
	phoneNumber char(10),
	distributorNumber char(10),
	primary key (subscriptionId)
	)`
	);

	await asyncQuery(
		connection,
		`
	create table if not exists ${tableNames.orders}(
	orderId varchar(10),
	subscriptionId varchar(10),
	deliveryDate datetime,
	paymentMethod enum('BKM','MASTERPASS','PAYATDOOR'),
	totalAmount decimal(5,2),
	status enum('NEW', 'CONFIRMED', 'COMPLETED', 'CANCELED'),
	primary key(orderId),
	foreign key (subscriptionId) references ${tableNames.subscriptions}(subscriptionId)
	)`
	);

	await asyncQuery(
		connection,
		`
  create table if not exists ${tableNames.products}(
  productId int,
  description varchar(100),
  primary key (productId)
  )`
	);

	await asyncQuery(
		connection,
		`
  create table if not exists ${tableNames.order_products}(
  id int auto_increment,
  orderId varchar(10),
  productId int,
  quantity int,
  primary key(id),
  foreign key (orderId) references ${tableNames.orders} (orderId),
  foreign key (productId) references ${tableNames.products} (productId)
  )`
	);
};
