import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class CheckToken implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    console.log(token);
    if (!token) {
      return res.send('Please Login');
    }
    // console.log(token)
    try {
      const decode = jwt.verify(token, process.env.ACCESS_TOKEN_RAHASIA);

      next();
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        res.send('unauthorization');
      }
    }
  }
}
