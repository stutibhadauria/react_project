import  { useState, useEffect } from "react";

import axios from "axios";


const API_KEY = "a2526df0";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const fetchMovies = async () => {
    if (!searchQuery) return;

    const response = await axios.get(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchQuery}`
    );
    setMovies(response.data.Search || []);
  };

  useEffect(() => {
    fetchMovies();
  }, [searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    fetchMovies();
  };

  const handleMovieSelect = (imdbID) => {
    setSelectedMovie(null); 
    axios
      .get(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`)
      .then(({ data }) => setSelectedMovie(data));
  };



  return (
    <div className="justify-center w-full">
      <header className="items-center">
        <h1 className=" text-center font-bold text-6xl">Movie Mania</h1>
      </header>
      <main>
        <div className="flex flex-wrap justify-center text-center">
          <input
            type="text"
            placeholder="Search for a Movie..."
            className="rounded-md w-96 h-8 mt-8 pl-2"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyPress={(e) => e.key === "Enter" && handleSearchSubmit()}
          />
        </div>

        <div className="flex flex-row flex-wrap justify-center">
          {movies.map((movie) => (
            <div
              key={movie.imdbID}
              className="w-40 text-left mt-4 p-2"
              onClick={() => handleMovieSelect(movie.imdbID)}
            >
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="w-50 rounded-md "
              />
              <h3>{movie.Title}</h3>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
