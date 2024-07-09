import React from 'react';
import { useImageContext } from '../../context/ImageContext.tsx';

const SearchBar: React.FC = () => {
  const { searchQuery, setSearchQuery } = useImageContext();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar;
