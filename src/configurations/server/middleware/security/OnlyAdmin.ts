import { injectable } from 'inversify';
import { BaseMiddleware } from 'inversify-express-utils';
import { NextFunction, Request, Response } from 'express';
import { ClientException } from '../../../../exceptions/ClientException';
import { AuthRequest, extractAuthUser } from './utils';

@injectable()
export class OnlyAdmin extends BaseMiddleware {

  public handler(req: Request, _: Response, next: NextFunction) {
    const authUser = extractAuthUser(req);
    (req as AuthRequest).user = authUser;

    if (!authUser.isAdmin) {
      throw new ClientException('Invalid permissions', 403);
    }
    next();
  }
}
