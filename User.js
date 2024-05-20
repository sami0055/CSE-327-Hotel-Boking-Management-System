/**
 * @module UserModel
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * User schema for MongoDB using Mongoose.
 * @typedef {Object} User
 * @property {string} name - The name of the user.
 * @property {string} username - The username of the user.
 * @property {string} email - The email address of the user.
 * @property {string} password - The password of the user.
 * @property {Date} dob - The date of birth of the user.
 * @property {string} accessToken - The access token of the user.
 * @property {string} refreshToken - The refresh token of the user.
 * @property {string} accessTokenExp - The expiration date of the access token.
 * @property {string} refreshTokenExp - The expiration date of the refresh token.
 * @property {boolean} isAdmin - Indicates if the user is an admin. Defaults to false.
 * @property {boolean} isManager - Indicates if the user is a manager. Defaults to false.
 * @property {boolean} isBlocked - Indicates if the user is blocked. Defaults to false.
 * @property {Date} joined - The date when the user joined. Defaults to the current date.
 */

const UserSchema = new Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    dob: Date,
    accessToken: String,
    refreshToken: String,
    accessTokenExp: String,
    refreshTokenExp: String,
    isAdmin: { type: Boolean, default: false },
    isManager: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    joined: { type: Date, default: Date.now }
});

module.exports = new mongoose.model('User', UserSchema);
