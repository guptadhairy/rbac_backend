const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            try {
                // Get token from header
                token = req.headers.authorization.split(' ')[1];

                // Verify token
                const decoded = jwt.verify(token, process.env.JWT_SECRET);

                // Get user from token
                const user = await User.findById(decoded.id).select('-password');

                if (!user) {
                    return res.status(401).json({ 
                        message: 'User not found' 
                    });
                }

                req.user = user;
                next();
            } catch (error) {
                console.log('Token verification error:', error);
                return res.status(401).json({ 
                    message: 'Not authorized, token failed',
                    error: error.message 
                });
            }
        }

        if (!token) {
            return res.status(401).json({ 
                message: 'Not authorized, no token provided' 
            });
        }
    } catch (error) {
        console.log('Auth middleware error:', error);
        return res.status(500).json({ 
            message: 'Server error in auth middleware',
            error: error.message 
        });
    }
};

module.exports = { protect };
