// SearchComponent.jsx
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchComponent = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    return (
        <div className="test-search-container mb-4 d-flex justify-content-between align-items-center">
            <input
                type="text"
                placeholder="Search"
                className="test-search-input"
                value={searchTerm}
                onChange={handleSearch}
            />
            <FaSearch className="test-search-icon" />
        </div>
    );
};

export default SearchComponent;