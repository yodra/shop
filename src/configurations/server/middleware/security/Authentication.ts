import { BaseMiddleware } from 'inversify-express-utils';
import { injectable } from 'inversify';
import { NextFunction, Request, Response } from 'express';
import { AuthRequest, extractAuthUser } from './utils';

@injectable()
export class Authentication extends BaseMiddleware {

  public handler(req: Request, _: Response, next: NextFunction) {
    (req as AuthRequest).user = extractAuthUser(req);
    next();
  }
}
