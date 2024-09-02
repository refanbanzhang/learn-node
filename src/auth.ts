import express from 'express';
import jwt from 'jsonwebtoken';
import { users } from './users';

const router = express.Router();

router.get('/login', (req, res) => {
  res.send(`
    <form action="/auth/login" method="post">
      <label for="email">Email:</label>
      <input type="text" id="email" name="email" value="zhangsan@example.com" required>
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" value="password123" required>
      <button type="submit">Login</button>
    </form>
  `);
});

router.post('/login', (req, res) => {
  const user = users.find(user => user.email === req.body.email && user.password === req.body.password);
  if (user) {
    const secret = process.env.ACCESS_TOKEN_SECRET;
    if (!secret) {
      res.status(500).send('Authentication signing requires a secret');
      return;
    }
    const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '1h' });
    // 设置cookie
    res.cookie('token', token, { httpOnly: true, secure: false, maxAge: 3600000 }); // 1小时过期
    res.json({ message: 'Login successful', userId: user.id, token });
  } else {
    res.status(401).send('Invalid credentials');
  }
});

router.post('/logout', (req, res) => {
  res.json({ message: 'Logout successful' });
});

export default router;