/**
 * @module HotelModel
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * Hotel schema for MongoDB using Mongoose.
 * @typedef {Object} Hotel
 * @property {string} image - The URL or path of the hotel's image.
 * @property {string} name - The name of the hotel.
 * @property {string} description - The description of the hotel.
 * @property {ObjectId} manager - The manager of the hotel. References the User model.
 * @property {ObjectId[]} rooms - The array of rooms associated with the hotel. References the Room model.
 * @property {Date} addedOn - The date when the hotel was added. Defaults to the current date.
 * @property {string} location - The location of the hotel.
 * @property {number} ratings - The ratings of the hotel. Defaults to null.
 * @property {number} totalRooms - The total number of rooms in the hotel.
 * @property {Map<string, string>} roomsMap - The map of rooms with their respective details.
 */

const HotelSchema = new Schema({
    image: String,
    name: String,
    description: String,
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    rooms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
    }],
    addedOn: { type: Date, default: Date.now },
    location: String,
    ratings: { type: Number, default: null },
    totalRooms: Number,
    roomsMap: { type: Map, of: String, required: true }
});

module.exports = new mongoose.model('Hotel', HotelSchema);
