/**
 * @module BookingModel
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * Booking schema for MongoDB using Mongoose.
 * @typedef {Object} Booking
 * @property {Date} from - The start date of the booking.
 * @property {Date} to - The end date of the booking.
 * @property {number} days - The number of days for the booking.
 * @property {number[]} roomNumbers - The array of room numbers booked.
 * @property {Date} bookedOn - The date when the booking was made. Defaults to the current date.
 * @property {boolean} paid - Indicates if the booking is paid.
 * @property {number} amount - The amount paid for the booking.
 * @property {string} location - The location of the booking.
 * @property {number} numOfPeople - The number of people for the booking.
 * @property {ObjectId} bookedBy - The user who made the booking. References the User model.
 * @property {Object} people - The details of the people included in the booking.
 * @property {number} people.children - The number of children included in the booking.
 * @property {number} people.adults - The number of adults included in the booking.
 * @property {ObjectId} room - The room associated with the booking. References the Room model.
 * @property {ObjectId} hotel - The hotel associated with the booking. References the Hotel model.
 */

const BookingSchema = new Schema({
    from: Date,
    to: Date,
    days: Number,
    roomNumbers: [Number],
    bookedOn: { type: Date, default: Date.now },
    paid: Boolean,
    amount: Number,
    location: String,
    numOfPeople: Number,
    bookedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    people: { children: Number, adults: Number },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
    },
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel'
    }
});

module.exports = new mongoose.model('Booking', BookingSchema);
