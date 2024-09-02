import express from 'express';
import { users } from './users'; // 假设用户数据从另一个文件导入

const router = express.Router();

router.get('/:id', (req, res) => {
  const user = users.find(user => user.id === req.params.id);
  user ? res.json(user) : res.status(404).send('User not found');
});

// 修改密码
router.post('/change-password/:id', (req, res) => {
  const { newPassword } = req.body;
  const user = users.find(user => user.id === req.params.id);
  if (user) {
    user.password = newPassword; // 假设密码直接存储在用户对象中
    res.send('Password changed successfully');
  } else {
    res.status(404).send('User not found');
  }
});

router.post('/forgot-password', (req, res) => {
  const { email } = req.body;
  const user = users.find(user => user.email === email);
  if (user) {
      // 实际操作中应发送一封包含重置密码链接的邮件
      // 这里只是模拟发送操作
      res.send('A password reset link has been sent to your email');
  } else {
      res.status(404).send('Email not found');
  }
});

export default router;
