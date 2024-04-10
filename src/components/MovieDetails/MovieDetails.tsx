import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./MovieDetails.css";

interface MovieDetails {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

interface MovieListProps {
  setSnackbarMessage: (message: string) => void;
}

const MovieDetails: React.FC<MovieListProps> = ({ setSnackbarMessage }) => {
  const { id } = useParams<{ id: string }>();
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `http://www.omdbapi.com/?i=${id}&apikey=878c67e1`
        );
        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setSnackbarMessage(error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-details-container">
      <div className="movie-details-card">
        <div className="movie-poster">
          <img src={movieDetails.Poster} alt={movieDetails.Title} />
        </div>
        <div className="movie-details">
          <p className="title">{movieDetails.Title}</p>
          <p>Type: {movieDetails.Type}</p>
          <p>Year: {movieDetails.Year}</p>
          <p>IMDb ID: {movieDetails.imdbID}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
