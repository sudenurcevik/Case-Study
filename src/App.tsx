import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MovieList from "./components/MovieList/MovieList.tsx";
import MovieDetails from "./components/MovieDetails/MovieDetails.tsx";
import Snackbar from "./helpers/Snackbar/Snackbar.tsx";

const App: React.FC = () => {
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbar, showSnackbar] = useState<boolean | null>(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<MovieList setSnackbarMessage={setSnackbarMessage} />}
        />
        <Route
          path="/movie/:id"
          element={<MovieDetails setSnackbarMessage={setSnackbarMessage} />}
        />
      </Routes>
      <Snackbar message={snackbarMessage} showSnackbar={showSnackbar} snackbar={snackbar} />
    </Router>
  );
};

export default App;
