import { NextFunction, Request, Response } from 'express';
import { unauthorizedError } from '../utils/errorUtils';

export default function validateSchema(schema) {
	return (req: Request, res: Response, next: NextFunction) => {
		const validation = schema.validate(req.body);

		if (validation.error) {
			const messageErro = validation.error.details.map((m) => m.message);
			throw unauthorizedError(messageErro);
		}

		return next();
	};
}
