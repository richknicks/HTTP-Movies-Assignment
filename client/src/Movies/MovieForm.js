import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const initialItem = {
  id: '',
  title: '',
  director: '',
  metascore: '',
  stars: [],
  }; 

const MovieForm = (props) =>{
    const [movieData, setMovieData]=useState(initialItem);
    const { id } = useParams();

    useEffect(() => {
        const movieToUpdate = props.items.find(movie => `${movie.id}` === id);
    
        if (movieToUpdate) {
          setMovieData(movieToUpdate);
        }
      }, [props.items, id]);
    
      const changeHandler = event => {
        event.persist();
        let value = event.target.value;
        if (event.target.name === 'price') {
          value = parseInt(value, 10);
        }
    
        setMovieData({
          ...movieData,
          [event.target.name]: value
        });
      };
    
      const handleSubmit = event => {
        event.preventDefault();
        axios
          .put(`http://localhost:5000/api/movies/${movieData.id}`, movieData)
          .then(res => {
            props.setMovieData(res.data);
            props.history.push(`/update-movie/${movieData.id}`);
          })
          .catch(err => console.log(err));
      };

    return (
    <div> 
        <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="Title"
          value={movieData.title}
        />
        <input
          type="string"
          name="director"
          onChange={changeHandler}
          placeholder="Director"
          value={movieData.director}
        />

        <input
          type="number"
          name="metascore"
          onChange={changeHandler}
          placeholder="Metascore"
          value={movieData.metascore}
        />
        <input
          type="string"
          name="stars"
          onChange={changeHandler}
          placeholder="Stars"
          value={movieData.stars}
        />
        <button>Update</button>
      </form> 
    </div>
    )}; 
    
    export default MovieForm;