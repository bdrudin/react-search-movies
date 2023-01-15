/* eslint-disable jsx-a11y/alt-text */
import "./App.css";
import { useEffect, useState } from "react";
import { getMovieList, searchMovie } from "./api";

const App = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result);
    });
  }, []);

  const PopularMovies = () => {
    const baseImg = process.env.REACT_APP_BASE_IMGURL;
    return popularMovies.map((movie, i) => {
      return (
        <div className="Movie-wrapper" key={i}>
          <div className="Movie-title">{movie.title}</div>
          <img
            className="Movie-image"
            src={`${baseImg}/${movie.poster_path}`}
          />
          <div className="Movie-date">{movie.release_date}</div>
          <div className="Movie-rate">Rate {movie.vote_average}</div>
        </div>
      );
    });
  };

  const search = async (q) => {
    const query = await searchMovie(q);
    if (q.length > 5) {
      setPopularMovies(query.results);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>TheDruuCinemax </h1>
        <p>Nonton gratiss gak pake bayar!</p>
        <input
          className="Movie-search"
          placeholder="cari film kesayangan..."
          onChange={({ target }) => {
            search(target.value);
          }}
        ></input>
        <div className="Movie-container">
          <PopularMovies />
        </div>
      </header>
    </div>
  );
};

export default App;
