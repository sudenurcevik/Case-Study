import React, { useState } from "react";
import "./Filter.css";

interface FilterProps {
  onFilter: (year: string, type: string) => void;
  defaultSelectedType: string;
  defaultSelectedYear: string;
}

const Filter: React.FC<FilterProps> = ({
  onFilter,
  defaultSelectedType,
  defaultSelectedYear,
}) => {
  const [year, setYear] = useState(defaultSelectedYear);
  const [type, setType] = useState(defaultSelectedType);

  const handleFilter = () => {
    onFilter(year, type);
  };
  const clearFilters = () => {
    setYear("");
    setType("");
    onFilter("", "");

    localStorage.removeItem("selectedYear");
    localStorage.removeItem("selectedType");
  };
  return (
    <div className="filter-container">
      <section className="input-section">
        <label htmlFor="year">Year:</label>
        <input
          type="text"
          id="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </section>
      <section>
        <label htmlFor="type">Type:</label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">All</option>
          <option value="movie">Movie</option>
          <option value="series">TV Series</option>
          <option value="episode">TV Series Episode</option>
        </select>
      </section>

      <section className="button-container">
        <button onClick={handleFilter}>Apply Filters</button>
        <button onClick={clearFilters} id="clear-button">
          Clear Filters
        </button>
      </section>
    </div>
  );
};

export default Filter;
