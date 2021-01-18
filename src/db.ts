import mysql from 'mysql';

const connection = mysql.createConnection({
	host: <string>process.env.MYSQL_HOST,
	port: parseInt(<string>process.env.MYSQL_PORT),
	database: <string>process.env.MYSQL_DB,
	user: <string>process.env.MYSQL_USER,
	password: <string>process.env.MYSQL_PASS,
	insecureAuth: true,
});
connection.connect();

export default connection;
