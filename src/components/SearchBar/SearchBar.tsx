import React, { useState } from "react";
import "./SearchBar.css";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  defaultSearchTerm: string;
  setSnackbarMessage: (message: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  defaultSearchTerm,
  setSnackbarMessage,
}) => {
  const [searchTerm, setSearchTerm] = useState(defaultSearchTerm);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setSnackbarMessage("Please enter a search term.");
    } else {
      setError(null);
      onSearch(searchTerm);
    }
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search for a movie..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        required
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
