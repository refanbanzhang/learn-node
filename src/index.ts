require('dotenv').config();

import express from 'express';
import path from 'path';
import userRouter from './user'; // 引入用户路由
import authRouter from './auth';
import uploadRouter from './upload';
import authenticateToken from './authenticate';
import cookieParser from 'cookie-parser';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Welcome to the Home Page. <a href="/auth/login">Login</a>');
});
app.use('/auth', authRouter);
app.use('/user', authenticateToken, userRouter);
app.use('/upload', uploadRouter);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
