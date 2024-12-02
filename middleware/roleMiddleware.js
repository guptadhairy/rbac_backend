const roleCheck = (roles) => {
    return (req, res, next) => {
        try {
            if (!req.user) {
                return res.status(401).json({ 
                    message: 'User not found in request' 
                });
            }

            if (!req.user.role) {
                return res.status(403).json({ 
                    message: 'User role not defined' 
                });
            }

            if (!roles.includes(req.user.role)) {
                return res.status(403).json({ 
                    message: `Access denied. Required roles: ${roles.join(', ')}. Your role: ${req.user.role}` 
                });
            }

            next();
        } catch (error) {
            console.log('Role middleware error:', error);
            return res.status(500).json({ 
                message: 'Server error in role middleware',
                error: error.message 
            });
        }
    };
};

module.exports = { roleCheck };
