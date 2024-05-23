/**
 * Function for decoding a JWT refresh token and extracting the email.
 * @function decodeRefreshToken
 * @param {string} token - The refresh token to decode.
 * @returns {string} The email extracted from the decoded token.
 * @throws {Error} If the token is invalid or expired.
 */
const jwt = require('jsonwebtoken')

module.exports = (token) => {
    let decodeToken;
    try{
        decodeToken = jwt.verify(token, 'refreshToken')
    }
    catch(err){
        throw new Error("Unauthorized!")
    }

    let email = decodeToken.email
    return email
}