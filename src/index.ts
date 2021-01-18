import './config';
import connection from './db';
import tables from './tables';
import app from './app';

import seed from './seed';

connection.on('connect', async () => {
	console.log('DB Connected!');
	const PORT = parseInt(<string>process.env.PORT) || 3000;

	await tables(connection);
	console.log('Database tables created!');

	await seed(connection);
	console.log('Database seeded with sample data!');

	app.listen(PORT, () => {
		console.log(`Listening at: ${PORT}!`);
	});
});

connection.on('error', (e) => {
	console.error(e);
	process.exit(-1);
});
