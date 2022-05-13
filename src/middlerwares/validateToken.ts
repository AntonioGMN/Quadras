// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';

// export default async function validateToken(req: Request, res: Response, nest: NextFunction) {
//   const { authorization } = req.headers;
//   const token = authorization?.replace('Bearer ', '');
//   const chaveSecreta = process.env.JWT_SECRET;

//   try {
//     jwt.verify(token, chaveSecreta);
//   } catch {
//     return res.status(401).send('invalide token');
//   }

//   res.locals.token = token;

//   return nest();
// }
