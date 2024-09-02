import express from 'express';
import path from 'path';

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

interface UserInfo {
    id: string;
    name: string;
    email: string;
    password: string; // Assuming password is also stored for login purposes
}

// Mock database of users
const users: UserInfo[] = [
    { id: '1', name: '张三', email: 'zhangsan@example.com', password: 'password123' },
    { id: '2', name: '李四', email: 'lisi@example.com', password: 'password456' }
];

// GET endpoint to fetch user information by ID
app.get('/user/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find(user => user.id === id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).send('User not found');
    }
});

// POST endpoint for user login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        res.json({ message: 'Login successful', userId: user.id });
    } else {
        res.status(401).send('Invalid credentials');
    }
});

// GET endpoint for the root route
app.get('/', (req, res) => {
    res.send('Welcome to the Home Page');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
