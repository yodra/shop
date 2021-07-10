import { BaseMiddleware } from 'inversify-express-utils';
import { injectable } from 'inversify';
import { NextFunction, Request, Response } from 'express';
import { ClientException } from '../../../exceptions/ClientException';
import { JwtPayload, verify } from 'jsonwebtoken';
import { Config } from '../../Config';

interface JwtShopPayload extends JwtPayload {
  roles?: string[];
}

const getJwtPayload = (token): JwtShopPayload => {
  try {
    return verify(token, Config.jwt.secret) as JwtShopPayload;
  } catch (e) {
    throw new ClientException('Invalid permissions', 403);
  }
};

@injectable()
export class Authentication extends BaseMiddleware {

  public handler(req: Request, _: Response, next: NextFunction) {
    const token = req.cookies[Config.jwt.cookieName];
    if (!token) {
      throw new ClientException('Invalid permissions', 403);
    }

    const payload = getJwtPayload(token);
    if (payload.roles?.includes('admin')) {
      console.log('admin');
    } else {
      console.log('no admin');
    }

    next();
  }
}
