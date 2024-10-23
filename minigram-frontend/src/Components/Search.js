import React, { useState } from 'react';
import '../Styles/Search.css';
import { FaSearch } from 'react-icons/fa';

const mockData = [
  { id: 1, name: 'John Doe', username: '@johndoe', image: 'https://picsum.photos/50' },
  { id: 2, name: 'Jane Smith', username: '@janesmith', image: 'https://picsum.photos/51' },
  { id: 3, name: 'Chris Adams', username: '@chrisadams', image: 'https://picsum.photos/52' },
  { id: 4, name: 'Lisa Park', username: '@lisapark', image: 'https://picsum.photos/53' },
];

const Search = () => {
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    setQuery(searchQuery);

    // Filter the data based on the search query
    if (searchQuery === '') {
      setFilteredData([]);
    } else {
      const results = mockData.filter((user) =>
        user.name.toLowerCase().includes(searchQuery) || user.username.toLowerCase().includes(searchQuery)
      );
      setFilteredData(results);
    }
  };

  return (
    <div className="search-container">
      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={handleSearch}
        />
      </div>

      {filteredData.length > 0 && (
        <div className="search-results">
          {filteredData.map((user) => (
            <div key={user.id} className="search-result-item">
              <img src={user.image} alt={user.name} className="search-result-image" />
              <div className="search-result-info">
                <p className="search-result-name">{user.name}</p>
                <p className="search-result-username">{user.username}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
