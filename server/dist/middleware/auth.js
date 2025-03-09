import jwt from 'jsonwebtoken';
export const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access denied' });
    }
    try {
        if (!process.env.JWT_SECRET_KEY) {
            throw new Error('JWT_SECRET_KEY is not defined');
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = { username: decoded.username };
        return next();
    }
    catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};
