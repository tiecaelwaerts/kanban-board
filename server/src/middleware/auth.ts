import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction): Response | void => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }

  try {
    if (!process.env.JWT_SECRET_KEY) {
      throw new Error('JWT_SECRET_KEY is not defined');
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY) as JwtPayload;
    req.user = { username: decoded.username };
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
