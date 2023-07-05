import React, {useEffect, useState} from 'react'
import { NavLink, useParams } from 'react-router-dom';
import { API_URL } from './context';

// use "useParams" hook to retrieve parameters defined in the URL

function SingleMovie() {
  const { id } = useParams(); // object destructuring to extract id from 

  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState("");

  const getMovies = async(url) => {
    setIsLoading(true);
      try{
          const res = await fetch(url);
          const data = await res.json();
          console.log(data);
          if(data.Response === "True") {
            setIsLoading(false);
            setMovie(data);
          }
      }
    catch(error) {
      console.log(error);
      }
  }
    
  useEffect(() => {
    let timerout = setTimeout(() => {
      getMovies(`${API_URL}&i=${id}`);
    }, 500); // 500ms k delay k bad response milega
    return () => clearTimeout(timerout);
  }, [id]); // id ki value change krene pe update kro : ye dependency hai

  if(isLoading) {
    return (
      <div className='movie-section'>
        <div className='loading'>Loading ...</div>
      </div>
    )
  }

  return (
    <>
      <section className='movie-section'>
        <div className='movie-card'>
          <figure>
            <img src={movie.Poster} alt = "" />
          </figure>
          <div className='card-content'>
            <p>
              <span className="card-text bolditalic">Title </span>
              <span className='card-text'> : {movie.Title}</span>
            </p>
            <p>
              <span className="card-text bolditalic">Actors </span>
              <span className='card-text'> : {movie.Actors}</span>
            </p>
            <p>
              <span className="card-text bolditalic">Awards </span>
              <span className='card-text'> : {movie.Awards}</span>
            </p>
            <p>
              <span className="card-text bolditalic">Plot </span>
              <span className='card-text'> : {movie.Plot}</span>
            </p>
            <p>
              <span className="card-text bolditalic">Released </span>
              <span className='card-text'> : {movie.Released}</span>
            </p>
            <p>
              <span className="card-text bolditalic">Genre </span>
              <span className='card-text'> : {movie.Genre}</span>
            </p>
            <p>
              <span className="card-text bolditalic">imdb </span>
              <span className='card-text'> : {movie.imdbRating} / 10</span>
            </p>
            <NavLink to = "/" className="back-btn">
              Go Back
            </NavLink>
          </div>
        </div>
      </section>
    </>
  )
}

export default SingleMovie;