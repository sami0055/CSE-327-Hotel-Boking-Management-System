// problem.js
class Hotel {
  constructor(name, availableRooms) {
    this.name = name;
    this.availableRooms = availableRooms;
  }

  bookRoom(numRooms) {
    if (numRooms > this.availableRooms) {
      return 'Not enough rooms available';
    } else if (numRooms <= 0) {
      return 'Invalid number of rooms';
    } else {
      this.availableRooms -= numRooms;
      return `${numRooms} rooms successfully booked`;
    }
  }

  getAvailableRooms() {
    return this.availableRooms;
  }
}

module.exports = Hotel;
