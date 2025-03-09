import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  console.log(`Login attempt for username: ${username}`);
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      console.log('User not found');
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      console.log('Invalid password');
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    if (!process.env.JWT_SECRET_KEY) {
      return res.status(500).json({ message: 'JWT secret key is not defined' });
    }
    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    return res.json({ token });
  } catch (error) {
    console.error('Internal server error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
