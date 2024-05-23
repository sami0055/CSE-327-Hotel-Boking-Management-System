const graphql = require('graphql')
const { UserType, AuthType } = require("../Type.js")
const bcrypt = require('bcryptjs')
const User = require("../../models/User.js")
const verifyToken = require('../../middlewares/verifyToken.js')
const jwt = require('jsonwebtoken')
const GraphQLDate = require('graphql-date')

const {
    GraphQLID,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType
} = graphql

/**
 * Mutation for creating a new user.
 * 
 * @type {GraphQLObjectType}
 * @property {GraphQLNonNull} name - The name of the user.
 * @property {GraphQLNonNull} username - The username of the user.
 * @property {GraphQLNonNull} dob - The date of birth of the user.
 * @property {GraphQLNonNull} email - The email address of the user.
 * @property {GraphQLNonNull} password - The password of the user.
 * 
 * @returns {UserType} The newly created user.
 */
const createUser = {
    type: UserType,
    args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        username: { type: new GraphQLNonNull(GraphQLString) },
        dob: { type: new GraphQLNonNull(GraphQLDate) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
    },
    async resolve(parent, args) {
        let query = await User.findOne({ email: args.email })
        if (query) {
            throw new Error('User already exists.')
        } else {
            let passHash = await bcrypt.hash(args.password, 12)

            const accessToken = await jwt.sign({ email: args.email }, 'accessToken', {
                expiresIn: '4h'
            })
            const refreshToken = await jwt.sign({ email: args.email }, 'refreshToken', {
                expiresIn: '7d'
            })

            let user = new User({
                username: args.username,
                name: args.name,
                email: args.email,
                password: passHash,
                dob: args.dob,
                accessToken: accessToken,
                refreshToken: refreshToken,
                accessTokenExp: '4h',
                refreshTokenExp: '7d'
            })
            let res = await user.save()
            return res
        }
    }
}

/**
 * Mutation for generating a new access token.
 * 
 * @type {GraphQLObjectType}
 * @property {GraphQLNonNull} refreshToken - The refresh token of the user.
 * 
 * @returns {UserType} The user with a new access token.
 */
const generateToken = {
    type: UserType,
    args: {
        refreshToken: { type: new GraphQLNonNull(GraphQLString) },
    },
    async resolve(parent, args) {
        if (!args.refreshToken) {
            throw new Error("Not a refresh token.")
        } else {
            let userEmail = await verifyToken(args.refreshToken)
            let user = await User.findOne({ email: userEmail })
            const accessToken = await jwt.sign({ email: user.email }, 'accessToken', {
                expiresIn: '4h'
            })
            const refreshToken = await jwt.sign({ email: user.email }, 'refreshToken', {
                expiresIn: '7d'
            })
            return {
                username: user.username,
                email: user.email,
                dob: user.dob,
                name: user.name,
                id: user._id,
                accessToken: accessToken,
                refreshToken: refreshToken,
                accessTokenExp: user.accessTokenExp,
                refreshTokenExp: user.refreshTokenExp,
                isAdmin: user.isAdmin,
                isManager: user.isManager,
                isBlocked: user.isBlocked,
                joined: user.joined
            }
        }
    }
}

/**
 * Mutation for updating a user's profile.
 * 
 * @type {GraphQLObjectType}
 * @property {GraphQLNonNull} id - The ID of the user.
 * @property {GraphQLNonNull} name - The updated name of the user.
 * @property {GraphQLNonNull} email - The updated email address of the user.
 * @property {GraphQLNonNull} dob - The updated date of birth of the user.
 * 
 * @returns {UserType} The updated user.
 */
const updateProfile = {
    type: UserType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        dob: { type: new GraphQLNonNull(GraphQLDate) }
    },
    async resolve(parent, args) {
        if (!args.id) throw new Error("ID is not given.");

        let user = await User.findByIdAndUpdate(args.id, {
            id: args.id,
            name: args.name,
            email: args.email,
            dob: args.dob
        }, { new: true })

        return user
    }
}

/**
 * Mutation for deleting a user account.
 * 
 * @type {GraphQLObjectType}
 * @property {GraphQLNonNull} id - The ID of the user.
 * 
 * @returns {UserType} The deleted user.
 */
const deleteAccount = {
    type: UserType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
    },
    async resolve(parent, args) {
        if (!args.id) throw new Error("ID is not given.");

        let res = await User.findByIdAndRemove(args.id).exec()
        return res
    }
}

/**
 * Mutation for making a user a manager.
 * 
 * @type {GraphQLObjectType}
 * @property {GraphQLNonNull} id - The ID of the user.
 * 
 * @returns {UserType} The updated user with manager privileges.
 */
const makeManager = {
    type: UserType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
    },
    async resolve(parent, args) {
        if (!args.id) {
            throw new Error("ID is not given.")
        } else {
            let user = await User.findByIdAndUpdate(args.id, {
                isManager: true
            }, { new: true })
            return user
        }
    }
}

/**
 * Mutation for blocking a user or manager.
 * 
 * @type {GraphQLObjectType}
 * @property {GraphQLNonNull} id - The ID of the user.
 * 
 * @returns {UserType} The blocked user.
 */
const blockUser = {
    type: UserType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
    },
    async resolve(parent, args) {
        if (!args.id) {
            throw new Error("ID is not given.")
        } else {
            let user = await User.findByIdAndUpdate(args.id, {
                isBlocked: true
            }, { new: true })
            return user
        }
    }
}

module.exports = {
    createUser,
    generateToken,
    updateProfile,
    deleteAccount,
    makeManager,
    blockUser,
}
