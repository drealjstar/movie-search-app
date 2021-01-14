import React, { Component } from "react";
import "./nominies.css";
import { reduceLength } from "./reduceLenght";

class Nominies extends Component {
  render() {
    const { nominate, removeMovies } = this.props;

    return (
      <div className="nominies">
        <h1 className="movies-nominated">MOVIES NOMINATED</h1>
        <div className="center-icon">
          <div className="round">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div className="boxes2">
          {nominate.map((movie, i) => {
            return (
              <div className="box" key={i}>
                <img src={movie.Poster} alt="No Poster" />
                <h3>Title: {reduceLength(movie.Title, 20)}</h3>
                <h3>Movie Year: {movie.Year}</h3>
                <button
                  className="nominating-button"
                  onClick={() => {
                    removeMovies(movie.imdbID);
                  }}
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Nominies;
