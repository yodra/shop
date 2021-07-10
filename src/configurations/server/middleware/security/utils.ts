import { Request } from 'express';
import { Config } from '../../../Config';
import { ClientException } from '../../../../exceptions/ClientException';
import { JwtPayload, verify } from 'jsonwebtoken';
import { ModelId } from '../../../../models/Base';

interface JwtShopPayload extends JwtPayload {
  roles?: string[];
}

export interface AuthRequest extends Request {
  user: {
    id: ModelId;
    isAdmin: boolean;
  };
}

const getJwtPayload = (token): JwtShopPayload => {
  try {
    return verify(token, Config.jwt.secret) as JwtShopPayload;
  } catch (e) {
    throw new ClientException('Invalid permissions', 403);
  }
};

export const extractAuthUser = (request: Request) => {
  const token = request.cookies[Config.jwt.cookieName];
  if (!token) {
    throw new ClientException('Invalid permissions', 403);
  }

  const payload = getJwtPayload(token);
  return {
    id: payload.id,
    isAdmin: payload.roles?.includes('admin') || false
  };
};
