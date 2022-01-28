const jwt = require('jsonwebtoken');
const config = require('config');

// Middleware function that has access to the request
// & response cycle. Next is a callback that we have to run
// to move onto the next piece of middleware.
module.exports = function(req, res, next) {
    // Header key that we are sending the token in
    const token = req.header('x-auth-token');

    // Check if not token
    if(!token) {
        return res.status(401).json({msg: 'No token, authorization denied'});
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        req.user = decoded.user;
        next();
    } catch(err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
}