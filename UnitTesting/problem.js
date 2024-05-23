// problem.js

// Sample data: List of hotels
const hotels = [
    { id: 1, name: 'Hotel A', city: 'Dhaka', price: 100 },
    { id: 2, name: 'Hotel B', city: 'Chittagong', price: 150 },
    { id: 3, name: 'Hotel C', city: 'Dhaka', price: 200 },
    { id: 4, name: 'Hotel D', city: 'Cumilla', price: 80 },
];

// Function to search hotels by city and/or maximum price
function searchHotels(city, maxPrice) {
    return hotels.filter(hotel => {
        return (!city || hotel.city.toLowerCase() === city.toLowerCase()) &&
               (!maxPrice || hotel.price <= maxPrice);
    });
}

// Export the function for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { searchHotels };
}