const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 login attempts per window
    message: {
        error: 'Too many login attempts. Please try again after 15 minutes.'
    }
});

module.exports = { authLimiter };
