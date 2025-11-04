import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET ?? 'fallback_secret_123';

export interface AuthRequest extends Request {
  user?: { id: number; email: string; rule: 'admin' | 'user' };
}

export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ erro: 'Token não fornecido' });
    return;
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      res.status(403).json({ erro: 'Token inválido' });
      return;
    }
    req.user = payload as AuthRequest['user'];
    next();
  });
};