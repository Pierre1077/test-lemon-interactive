import React, {useState} from 'react';
import { useLocation } from 'react-router-dom';
import MovieCard from "../../components/MovieCard/MovieCard";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

const Detail = () => {
    const location = useLocation();
    const movie = location.state.movie;
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    function addToFavorites(movie) {
        const isFavorite = favoriteMovies.some((favMovie) => favMovie.id === movie.id);
        let updatedFavorites = [];

        if (isFavorite) {
            updatedFavorites = favoriteMovies.filter((favMovie) => favMovie.id !== movie.id);
        } else {
            updatedFavorites = [...favoriteMovies, movie];
        }

        setFavoriteMovies(updatedFavorites);
        localStorage.setItem('favoriteMovies', JSON.stringify(updatedFavorites));
    }

    const addToFavoriteIcon = (
        <FontAwesomeIcon icon={faThumbsUp} className="addToFavorite" />
    );

    const removeToFavoriteIcon = (
        <FontAwesomeIcon icon={faThumbsUp} className="removeToFavorite" />
    );

    return (
        <div>
            <h2 className="movieTitle">Page de détail pour le film</h2>
            <MovieCard
                title={movie.name}
                genres={movie.genres.join(', ')}
                rating={movie.rating.average}
                thumbnail={movie.image.original}
                addToFavorite={() => addToFavorites(movie)}
                isFavorite={favoriteMovies.some((favMovie) => favMovie.id === movie.id) ? addToFavoriteIcon : removeToFavoriteIcon}
            />
        </div>
    );
};

export default Detail;
