// import { Request, Response, NextFunction } from 'express';
// import { AppError } from "../utils/errorUtils.js";
// import pkg  from '@prisma/client';
// const {Prisma} = pkg;

// export default function errorHandlingMiddleware(
// 	error: Error | AppError,
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
// 	if (error instanceof Prisma.PrismaClientKnownRequestError) {
//      if (error.code === 'P2002') {
// 	 		return res.status(409).send(error.message)
//      }
// 	 }

//   if ("type" in error) {
//     if (error.type === "not_found") {
//       return res.status(404).send(error.message);
//     }

//     if (error.type === "bad_request") {
//       return res.status(400).send(error.message);
//     }

//     if (error.type === "unauthorized") {
//       return res.status(401).send(error.message);
//     }
//   }

// 	return res.sendStatus(500);
// }
