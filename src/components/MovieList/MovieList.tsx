import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MovieList.css";
import SearchBar from "../SearchBar/SearchBar.tsx";
import Filter from "../Filter/Filter.tsx";

interface Movie {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

interface MovieListProps {
  setSnackbarMessage: (message: string) => void;
}

const MovieList: React.FC<MovieListProps> = ({ setSnackbarMessage }) => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedYear, setSelectedYear] = useState(
    () => localStorage.getItem("selectedYear") || ""
  );
  const [selectedType, setSelectedType] = useState(
    () => localStorage.getItem("selectedType") || ""
  );
  const [searchTerm, setSearchTerm] = useState(
    () => localStorage.getItem("searchTerm") || "Pokemon"
  );
  const [searchError, setSearchError] = useState<string | null>(null);
  const moviesPerPage = 10;

  useEffect(() => {
    localStorage.setItem("searchTerm", searchTerm);
    localStorage.setItem("selectedYear", selectedYear);
    localStorage.setItem("selectedType", selectedType);
    fetchData(currentPage, selectedYear, selectedType, searchTerm);
  }, [currentPage, selectedYear, selectedType, searchTerm]);

  const fetchData = async (
    page: number,
    year: string,
    type: string,
    searchTerm: string
  ) => {
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?s=${searchTerm}&apikey=878c67e1&page=${page}&y=${year}&type=${type}`
      );
      const data = await response.json();
      if (data.Response === "True") {
        setMovies(data.Search);
        setTotalPages(Math.ceil(parseInt(data.totalResults) / moviesPerPage));
        setSearchError(null);
      } else {
        setMovies([]);
        setTotalPages(0);
        setSearchError(data.Error);
        setSnackbarMessage(data.Error);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const searchMovies = async (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const filterMovies = async (year: string, type: string) => {
    setSelectedYear(year);
    setSelectedType(type);
    setCurrentPage(1);
  };

  const handleClick = (id: string) => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className="movie-list-container">
      <h2>Welcome to OMDb!</h2>
      <div className="search-filter-container">
        <SearchBar
          onSearch={searchMovies}
          defaultSearchTerm={searchTerm}
          setSnackbarMessage={setSnackbarMessage}
        />
        <Filter
          onFilter={filterMovies}
          defaultSelectedYear={selectedYear}
          defaultSelectedType={selectedType}
        />
      </div>
      {searchError ? (
        <div className="search-error">Upsi!</div>
      ) : (
        <React.Fragment>
          <table className="movie-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Type</th>
                <th>Year</th>
                <th>IMDb ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie, index) => (
                <tr
                  key={movie.imdbID}
                  onClick={() => handleClick(movie.imdbID)}
                >
                  <td>{(currentPage - 1) * 10 + index + 1}</td>
                  <td>{movie.Title}</td>
                  <td>{movie.Type}</td>
                  <td>{movie.Year}</td>
                  <td>{movie.imdbID}</td>
                  <td id="icon-row">
                    <i className="fa fa-chevron-right"></i>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={6}>
                  <div className="pagination">
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <i className="fa fa-arrow-left"></i>
                    </button>
                    <span style={{ color: "#666" }}>
                      {currentPage} / {totalPages}
                    </span>
                    <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      <i className="fa fa-arrow-right"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </React.Fragment>
      )}
    </div>
  );
};

export default MovieList;
