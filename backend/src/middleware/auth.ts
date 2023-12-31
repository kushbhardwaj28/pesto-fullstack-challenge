import { Request, Response, NextFunction } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { SECRET, sessionTtl } from '../constants';
import dayjs from 'dayjs';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // check if auth header exists
    if (req.cookies.user_token) {
      // parse token from header
      const token = req.cookies.user_token;
      if (token) {
        const payload = verify(token, SECRET) as JwtPayload;
        if (payload) {
          if (
            payload.iat &&
            !dayjs(payload.iat * 1000 + +sessionTtl).isBefore(dayjs())
          ) {
            // store user data in request object
            req.secret = JSON.stringify({
              id: payload.id,
              isAdmin: payload.username === 'admin',
            });
            next();
          } else {
            res.status(400).json({ error: 'Session expired' });
          }
        } else {
          res.status(400).json({ error: 'token verification failed' });
        }
      } else {
        res.status(400).json({ error: 'malformed auth header' });
      }
    } else {
      res.status(400).json({ error: 'In-valid session' });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};
