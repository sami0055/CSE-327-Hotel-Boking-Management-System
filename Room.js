/**
 * @module RoomModel
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * Room schema for MongoDB using Mongoose.
 * @typedef {Object} Room
 * @property {Object[]} images - The array of image objects for the room.
 * @property {string} images.url - The URL or path of the image.
 * @property {string} images.uuid - The UUID of the image.
 * @property {string} name - The name of the room.
 * @property {string} description - The description of the room.
 * @property {number} occupancy - The maximum occupancy of the room.
 * @property {string[]} others - The array of other features of the room.
 * @property {ObjectId} hotel - The hotel associated with the room. References the Hotel model.
 * @property {number} price - The price of the room.
 * @property {Date} addedOn - The date when the room was added. Defaults to the current date.
 * @property {number} ratings - The ratings of the room. Defaults to null.
 * @property {ObjectId[]} bookings - The array of bookings associated with the room. References the Booking model.
 * @property {number[]} roomNumbers - The array of room numbers.
 */

const RoomSchema = new Schema({
    images: [{
        url: String,
        uuid: String
    }],
    name: String,
    description: String,
    occupancy: Number,
    others: [String],
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel'
    },
    price: Number,
    addedOn: { type: Date, default: Date.now },
    ratings: { type: Number, default: null },
    bookings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking'
    }],
    roomNumbers: [Number]
});

module.exports = new mongoose.model('Room', RoomSchema);
