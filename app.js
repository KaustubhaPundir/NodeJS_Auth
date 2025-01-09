import path from "path";
import express from 'express'
import bcrypt from 'bcrypt';
import User from './models/user.js';
import bodyParser from 'body-parser';
import * as url from 'url';
const __root = url.fileURLToPath(new URL('..', import.meta.url));
const redirectToLogin = (req, res, next) => {
    if (req.path === '/') {
        return res.redirect('/login');
    }
    next();
};

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(redirectToLogin);


app.get("/login", (req, res, next) => {
    res.sendFile(path.join(__root, 'node', 'views', 'login.html'));
});
app.get("/register", (req, res, next) => {
    res.sendFile(path.join(__root, 'node', 'views', 'register.html'));
});
app.get("/forget", (req, res, next) => {
    res.sendFile(path.join(__root, 'node', 'views', 'forgetpass.html'));
});



app.post('/register', async (req, res) => {
    try {
        const { email, username, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) { return res.status(400).json({ message: 'User already exists',redirectUrl: '/login'}); }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, username, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully',redirectUrl: '/login'})
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({ message: 'User logged in successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
app.post('/forget', async (req, res) => {
    try {
        const email = req.body.email;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'Password reset link sent to email' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});



const port = 3000; 
app.listen(port, () => { console.log("Server running at http://localhost:3000/"); });