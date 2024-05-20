import React from 'react';
import "./search.css";
import { Input } from "../GlobalStyles/FormStyles";

/**
 * SearchBar component renders an input field for searching.
 * 
 * @component
 * @param {object} props - Component properties
 * @param {string} props.placeholder - Placeholder text for the input field
 * @param {string} props.query - Current query value
 * @param {function} props.setQuery - Function to update the query value
 * 
 * @example
 * // Usage example:
 * // <SearchBar 
 * //    placeholder="Search..."
 * //    query={searchQuery}
 * //    setQuery={setSearchQuery} 
 * // />
 * 
 * @returns {JSX.Element} The rendered SearchBar component
 */
const SearchBar = (props) => {
    return (
        <div className="search-bar">
            <Input 
                placeholder={props.placeholder}
                value={props.query}
                onChange={(e) => props.setQuery(e.target.value)} 
            />
        </div>
    );
};

export default SearchBar