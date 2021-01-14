import Axios from "axios";
import React, { Component } from "react";
import "./movie.css";
import Nominies from "./nominies";
import {reduceLength} from './reduceLenght';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



class Movie extends Component {
  state = {
    movies: [],
    searchText: "",
    loading: false,
    nominate: []
  };

  searchHandler = () => {
this.setState({loading : true});

    Axios.get(
      `https://www.omdbapi.com/?i=tt3896198&apikey=cf61d779&type=movie&s=${this.state.searchText}`
    ).then((result) => {
      this.setState({ movies: result.data.Search,loading:false });
    });
  };

  handleChange = (e) => {
    this.setState({ searchText: e.target.value });
  };

  handleNominate = (movie) =>{
    this.setState({nominate : [...this.state.nominate, movie] });

  };

   removeMovies = (id) => {
     const removedMovie = this.state.nominate.filter(movies => {
       return movies.imdbID !== id
     })
     this.setState({
       nominate : removedMovie
     })
   }


  render() {
    const { movies, loading, nominate } = this.state;

    return (
      <div className="home-page">
        <div className="title">
          <h1 className="title-size">MID-YEAR MOVIE NOMINATION</h1>
        </div>

        <div className="movie-list">
          <h1>Movies</h1>
        </div>

        <div className="search">
          <input
          placeholder="movie title"
            onChange={this.handleChange}
          />
          <button className="search-button" onClick={this.searchHandler}>
            search
          </button>
        </div>

        {loading ? (
          <h2 className="loading">Loading ...</h2>
        ) : (
          <div className="boxes">
            {movies.map((movie, i) => {
              const isNominated = nominate.find(nom => {
               return nom.imdbID === movie.imdbID
              })
              return (
                <div className="box" key={i}>
                  <img src={movie.Poster} alt="No Poster" />
                  <h3>Title: {reduceLength(movie.Title, 20)}</h3>
                  <h3>Movie Year: {movie.Year}</h3>
                  <button 
                  className={`nominating-button  ${isNominated ? 'nominated' : ''}`}
                  onClick={() => {
                    this.handleNominate(movie)
                  if(nominate.length === 5){
                    toast.success("You Have Nominate 5 Movies",{
                      position: "bottom-right",
                      autoClose: 5000
                      });

                  }
                  }}
                  disabled ={isNominated}
                  
                  >Nominate</button>
                </div>
              );
            })}

          </div>
        )}

<Nominies nominate={nominate} removeMovies={this.removeMovies}/>
<ToastContainer 
position="bottom-right"
autoClose={5000} 
/>
        
  </div>   

      );
  }
}



export default Movie;





