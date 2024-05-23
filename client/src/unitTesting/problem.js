// problem.js

// Sample data representing hotels
const hotels = [
    { id: 1, name: 'Hotel California', location: 'California', price: 100 },
    { id: 2, name: 'Hotel New York', location: 'New York', price: 200 },
    { id: 3, name: 'Hotel Texas', location: 'Texas', price: 150 }
];

/**
 * Search hotels by location and price range
 * @param {string} location - Location to search
 * @param {number} minPrice - Minimum price
 * @param {number} maxPrice - Maximum price
 * @returns {Array} - Filtered hotels
 */
function searchHotels(location, minPrice, maxPrice) {
    return hotels.filter(hotel => 
        hotel.location.toLowerCase().includes(location.toLowerCase()) &&
        hotel.price >= minPrice &&
        hotel.price <= maxPrice
    );
}

module.exports = { searchHotels };
