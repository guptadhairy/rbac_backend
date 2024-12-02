const User = require('../models/User');

// Enhanced getUserProfile with role-based information
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        
        // Base profile information
        let profileData = {
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt
        };

        // Additional information for admin users
        if (user.role === 'admin') {
            const adminStats = await getAdminDashboardStats();
            profileData = {
                ...profileData,
                dashboardStats: adminStats,
                adminPrivileges: [
                    "User Management",
                    "System Configuration",
                    "Access Control",
                    "Analytics Dashboard",
                    "Audit Logs"
                ],
                lastLogin: new Date(),
                securityLevel: "High"
            };
        }

        res.json(profileData);
    } catch (error) {
        console.error('Profile Error:', error);
        res.status(500).json({ 
            message: 'Error fetching profile',
            error: error.message 
        });
    }
};

// Helper function to get admin dashboard stats
const getAdminDashboardStats = async () => {
    try {
        const totalUsers = await User.countDocuments();
        const usersByRole = await User.aggregate([
            { $group: { _id: '$role', count: { $sum: 1 } } }
        ]);

        const recentUsers = await User.find()
            .select('username email role createdAt')
            .sort({ createdAt: -1 })
            .limit(5);

        return {
            totalUsers,
            usersByRole,
            recentUsers,
            systemStatus: "Healthy",
            lastUpdated: new Date()
        };
    } catch (error) {
        console.error('Admin Stats Error:', error);
        throw error;
    }
};

// Admin only - Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({})
            .select('-password')
            .sort({ createdAt: -1 });

        res.json({
            users,
            totalCount: users.length,
            adminInfo: {
                requestedBy: req.user.username,
                timestamp: new Date()
            }
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error fetching users',
            error: error.message 
        });
    }
};

// Admin only - System overview
const getSystemOverview = async (req, res) => {
    try {
        const systemStats = {
            userMetrics: {
                total: await User.countDocuments(),
                active: await User.countDocuments({ /* Add active condition */ }),
                newToday: await User.countDocuments({
                    createdAt: { 
                        $gte: new Date(new Date().setHours(0,0,0,0)) 
                    }
                })
            },
            roleDistribution: await User.aggregate([
                { $group: { _id: '$role', count: { $sum: 1 } } }
            ]),
            systemHealth: {
                status: 'Operational',
                lastBackup: new Date(),
                serverUptime: process.uptime()
            },
            securityMetrics: {
                failedLogins: 0, // Implement tracking if needed
                activeTokens: 0,  // Implement tracking if needed
                lastSecurityScan: new Date()
            }
        };

        res.json(systemStats);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error fetching system overview',
            error: error.message 
        });
    }
};

module.exports = {
    getUserProfile,
    getAllUsers,
    getSystemOverview
};
