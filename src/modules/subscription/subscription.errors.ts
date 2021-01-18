import { CustomError } from '../utility';

export default {
	NO_RECORD_WITH_PHONE: new CustomError('Belirtilen telefona ait kayıt bulunamamıştır.', 403),
	NO_RECORD_WITH_SUB_ID: new CustomError('Belirtilen abone numarasına ait kayıt bulunamamıştır.', 404),
};
