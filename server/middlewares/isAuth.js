/**
 * Middleware for verifying JWT tokens in the Authorization header.
 * @function verifyToken
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {function} next - The next middleware function.
 * @returns {void}
 */
const jwt = require('jsonwebtoken')

module.exports = (req,res, next) => {
    const authHeader = req.get('Authorization')
    if(!authHeader){
        req.isAuth = false;
        return next()
    }

    let token = authHeader.split(' ')[1]
    if(!token || token === ''){
        req.isAuth = false
        return next()
    }

    let decodeToken;

    try{
        decodeToken = jwt.verify(token, 'accessToken')
    }
    catch(err){
        req.isAuth = false;
        return next()
    }

    req.isAuth = true
    req.email = decodeToken.email
    next()
}