const supabase = require('../config/supabase');

/**
 * Authentication Middleware
 * Verifies the Supabase JWT token from the Authorization header
 * and attaches the user object to the request.
 */
const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const { data: { user }, error } = await supabase.auth.getUser(token);

        if (error || !user) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }

        // Attach user info to request
        req.user = {
            id: user.id,
            email: user.email,
            role: user.user_metadata?.role || 'customer', // Default to customer
            fullName: user.user_metadata?.full_name
        };

        next();
    } catch (err) {
        console.error('AUTH MIDDLEWARE ERROR:', err);
        res.status(500).json({ message: 'Authentication server error' });
    }
};

module.exports = authMiddleware;
