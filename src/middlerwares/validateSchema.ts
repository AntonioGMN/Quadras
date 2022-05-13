import { NextFunction, Request, Response } from 'express';

export default function validateSchema(schema) {
	return (req: Request, res: Response, next: NextFunction) => {
		const validation = schema.validate(req.body);

		if (validation.error) {
			const messageErro = validation.error.details.map((m) => m.message);
			return res.status(422).send(messageErro);
		}

		return next();
	};
}
