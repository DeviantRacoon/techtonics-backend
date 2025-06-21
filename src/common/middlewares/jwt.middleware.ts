import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '@libs/token';

import userSessionRepository from '@modules/users/infrastructure/repositories/user-session.repository';

import dotenv from '@config/dotenv';
dotenv.config();

const EXCLUDE_ROUTES = ['/api/auth/login', '/'];
const UNAUTHORIZED_MESSAGE = "Access Denied: Unauthorized access. Please provide a valid token.";

const validateTokens = async (token: string) => {
  const tokenSession = await userSessionRepository.getOneUserSessionByParams({ token, status: 'ACTIVO' });

  if (!tokenSession) {
    return { valid: false, message: UNAUTHORIZED_MESSAGE };
  }

  const tokenData = verifyToken(token);

  if (tokenData.error) {
    await userSessionRepository.createUserSessionOrUpdate({ ...tokenSession, status: 'ELIMINADO' });
    return { valid: false, message: `Token verification failed: ${tokenData.error}` };
  }

  if (tokenData.error && tokenData.error !== 'TokenExpiredError') {
    await userSessionRepository.createUserSessionOrUpdate({ ...tokenSession, status: 'ELIMINADO' });
    return { valid: false, message: UNAUTHORIZED_MESSAGE };
  }

  return { valid: true, userData: tokenData };
};

const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  // if (process.env.NODE_ENV === 'development') {
  //   return next();
  // }

  if (EXCLUDE_ROUTES.includes(req.path)) return next();

  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ ok: false, message: UNAUTHORIZED_MESSAGE });
  }

  const { valid, userData, message } = await validateTokens(token);
  if (!valid) {
    return res.status(401).json({ ok: false, message });
  }

  (req as any).user = userData;
  next();
};

export default authMiddleware;
