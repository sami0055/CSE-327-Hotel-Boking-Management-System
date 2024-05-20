const graphql = require('graphql')
const { UserType, AuthType, HotelType } = require("../Type.js")
const bcrypt = require('bcryptjs')
const User = require("../../models/User.js")
const Hotel = require("../../models/Hotel.js")
const verifyToken = require('../../middlewares/verifyToken.js')
const jwt = require('jsonwebtoken')
const Room = require('../../models/Room.js')
const Booking = require('../../models/Booking.js')

const {
    GraphQLID,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
} = graphql

/**
 * Mutation for adding a new hotel.
 * 
 * @type {GraphQLObjectType}
 * @property {GraphQLString} image - The image URL of the hotel.
 * @property {GraphQLNonNull} name - The name of the hotel.
 * @property {GraphQLNonNull} description - The description of the hotel.
 * @property {GraphQLNonNull} totalRooms - The total number of rooms in the hotel.
 * @property {GraphQLNonNull} manager - The ID of the manager managing the hotel.
 * @property {GraphQLNonNull} location - The location of the hotel.
 * 
 * @returns {HotelType} The newly created hotel.
 */
const addHotel = {
    type: HotelType,
    args: {
        image: { type: GraphQLString },
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        totalRooms: { type: new GraphQLNonNull(GraphQLInt) },
        manager: { type: new GraphQLNonNull(GraphQLID) },
        location: { type: new GraphQLNonNull(GraphQLString) }
    },
    async resolve(parent, args) {
        let query = await Hotel.findOne({ manager: args.manager })
        if (query) {
            throw new Error('Cannot add multiple hotels.')
        }
        else {
            let hotel = new Hotel({
                image: args.image,
                name: args.name,
                description: args.description,
                location: args.location,
                manager: args.manager,
                totalRooms: args.totalRooms,
                roomsMap: {},
                rooms: []
            })
            let res = await hotel.save()
            return res
        }
    }
}

/**
 * Mutation for updating an existing hotel.
 * 
 * @type {GraphQLObjectType}
 * @property {GraphQLNonNull} id - The ID of the hotel to be updated.
 * @property {GraphQLNonNull} name - The updated name of the hotel.
 * @property {GraphQLNonNull} description - The updated description of the hotel.
 * @property {GraphQLString} image - The updated image URL of the hotel.
 * @property {GraphQLNonNull} location - The updated location of the hotel.
 * @property {GraphQLInt} ratings - The updated ratings of the hotel.
 * @property {GraphQLNonNull} totalRooms - The updated total number of rooms in the hotel.
 * 
 * @returns {HotelType} The updated hotel.
 */
const updateHotel = {
    type: HotelType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        image: { type: GraphQLString },
        location: { type: new GraphQLNonNull(GraphQLString) },
        ratings: { type: GraphQLInt },
        totalRooms: { type: new GraphQLNonNull(GraphQLInt) },
    },
    async resolve(parent, args) {
        if (!args.id) throw new Error("ID is not given.");

        let hotel = await Hotel.findByIdAndUpdate(args.id, {
            id: args.id,
            name: args.name,
            description: args.description,
            image: args.image,
            location: args.location,
            ratings: args.ratings,
            totalRooms: args.totalRooms,
        }, { new: true })

        return hotel
    }
}

/**
 * Mutation for deleting a hotel.
 * 
 * @type {GraphQLObjectType}
 * @property {GraphQLNonNull} id - The ID of the hotel to be deleted.
 * 
 * @returns {HotelType} The deleted hotel.
 */
const deleteHotel = {
    type: HotelType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
    },
    async resolve(parent, args) {
        let hotel = await Hotel.findById(args.id)
        if (!hotel) {
            throw new Error('Hotel not found.')
        }
        else {
            hotel.rooms.forEach(async r => {
                let room = await Room.findById(r._id)
                room.bookings.forEach(async b => {
                    let booking = await Booking.findById(b._id)
                    await booking.delete()
                })
                await room.delete()
            })
            let res = await hotel.delete()
            return res
        }
    }
}

module.exports = {
    addHotel,
    updateHotel,
    deleteHotel
}
