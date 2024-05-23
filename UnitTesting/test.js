// test.js

// Import the searchHotels function if in Node.js environment
if (typeof require !== 'undefined') {
    var { searchHotels } = require('./problem');
}

describe('searchHotels', function() {
    it('should return hotels in the specified city', function() {
        const result = searchHotels('Dhaka');
        chai.expect(result).to.deep.equal([
            { id: 1, name: 'Hotel A', city: 'Dhaka', price: 100 },
            { id: 3, name: 'Hotel C', city: 'Dhaka', price: 200 }
        ]);
    });

    it('should return hotels within the specified maximum price', function() {
        const result = searchHotels(null, 100);
        chai.expect(result).to.deep.equal([
            { id: 1, name: 'Hotel A', city: 'Dhaka', price: 100 },
            { id: 4, name: 'Hotel D', city: 'Cumilla', price: 80 }
        ]);
    });

    it('should return hotels in the specified city and within the specified maximum price', function() {
        const result = searchHotels('Dhaka', 150);
        chai.expect(result).to.deep.equal([
            { id: 1, name: 'Hotel A', city: 'Dhaka', price: 100 }
        ]);
    });

    it('should return an empty array if no hotels match the criteria', function() {
        const result = searchHotels('Barisal', 100);
        chai.expect(result).to.deep.equal([]);
    });

    it('should return all hotels if no criteria is specified', function() {
        const result = searchHotels();
        chai.expect(result).to.deep.equal(hotels);
    });
});