import { Connection } from 'mysql';

export const asyncQuery = (connection: Connection, query: string, values?: any[]): Promise<{ result: any; fields: any }> => {
	return new Promise((res, rej) => {
		connection.query(query, values, (err, result, fields) => {
			if (err) {
				return rej(err);
			}
			return res({ result, fields });
		});
	});
};
