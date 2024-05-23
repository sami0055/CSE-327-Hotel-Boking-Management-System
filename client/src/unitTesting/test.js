// test.js

const { expect } = require('chai');
const { searchHotels } = require('./problem');

describe('searchHotels', () => {
    it('should return hotels in the specified location and within the price range', () => {
        const result = searchHotels('California', 50, 150);
        expect(result).to.be.an('array').that.is.not.empty;
        expect(result[0]).to.have.property('name', 'Hotel California');
    });

    it('should return an empty array if no hotels match the criteria', () => {
        const result = searchHotels('Florida', 50, 150);
        expect(result).to.be.an('array').that.is.empty;
    });

    it('should return hotels in a case-insensitive manner', () => {
        const result = searchHotels('california', 50, 150);
        expect(result).to.be.an('array').that.is.not.empty;
        expect(result[0]).to.have.property('name', 'Hotel California');
    });

    it('should return hotels within the specified price range', () => {
        const result = searchHotels('New York', 100, 300);
        expect(result).to.be.an('array').that.is.not.empty;
        expect(result[0]).to.have.property('name', 'Hotel New York');
    });

    it('should return an empty array if the price range does not match', () => {
        const result = searchHotels('Texas', 200, 300);
        expect(result).to.be.an('array').that.is.empty;
    });
});
