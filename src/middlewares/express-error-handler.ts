import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../modules/utility';

const INTERNAL_SERVER_ERROR = new CustomError('Sunucu hatası. Lütfen tekrar deneyin.', 500);

export default function (err: CustomError, req: Request, res: Response, next: NextFunction) {
	if (!err.code) {
		err = INTERNAL_SERVER_ERROR;
	}

	res.status(err.code).send({ message: err.message });
}
