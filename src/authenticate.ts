import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // 从cookie中读取token
  const token = req.cookies.token;
  if (token == null) return res.status(401).send('未提供认证令牌');

  // 确保环境变量已定义
  const secret = process.env.ACCESS_TOKEN_SECRET;
  if (!secret) {
    console.error('环境变量 ACCESS_TOKEN_SECRET 未定义');
    return res.status(500).send('内部服务器错误');
  }

  jwt.verify(token, secret, (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    const newToken = jwt.sign({ userId: user.userId }, secret, { expiresIn: '1h' });
    // 将新令牌存储在cookie中
    res.cookie('token', newToken, { httpOnly: true, secure: false, maxAge: 3600000 }); // 1小时过期
    next();
  });
}

export default authenticateToken

