

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function authenticate(requiredRole?: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
      req.user = decoded;

      if (requiredRole && decoded.role !== requiredRole) {
        return res.status(403).json({ error: 'Insufficient permissions' });
      }

      next();
    } catch (err) {
      res.status(400).json({ error: 'Invalid token' });
    }
  };
}

