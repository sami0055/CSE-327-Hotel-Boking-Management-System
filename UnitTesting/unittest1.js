// test.js
const assert = require('assert');
const Hotel = require('./problem.js');

describe('Hotel Booking', function () {
  let hotel;

  beforeEach(function () {
    hotel = new Hotel('Grand Plaza', 10);
  });

  it('should book a room successfully', function () {
    const result = hotel.bookRoom(3);
    assert.strictEqual(result, '3 rooms successfully booked');
    assert.strictEqual(hotel.getAvailableRooms(), 7);
  });

  it('should not book more rooms than available', function () {
    const result = hotel.bookRoom(11);
    assert.strictEqual(result, 'Not enough rooms available');
    assert.strictEqual(hotel.getAvailableRooms(), 10);
  });

  it('should not book zero or negative number of rooms', function () {
    const result = hotel.bookRoom(0);
    assert.strictEqual(result, 'Invalid number of rooms');
    assert.strictEqual(hotel.getAvailableRooms(), 10);

    const resultNegative = hotel.bookRoom(-5);
    assert.strictEqual(resultNegative, 'Invalid number of rooms');
    assert.strictEqual(hotel.getAvailableRooms(), 10);
  });

  it('should return the correct number of available rooms', function () {
    hotel.bookRoom(2);
    assert.strictEqual(hotel.getAvailableRooms(), 8);
  });
});
