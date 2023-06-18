import React, { useEffect, useState } from 'react';
import MovieCard from "../../components/MovieCard/MovieCard";
import {useNavigate} from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

const Favorite = () => {
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favoriteMovies'));
        if (storedFavorites) {
            setFavoriteMovies(storedFavorites);
        }
    }, []);

    function navigateToDetail(movie) {
        navigate(`/detail`, { state: { movie } });
    }

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
            <h2 className="movieTitle">Favorite Movies</h2>
            <div className="allMovies__wrapper">
                {favoriteMovies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        title={movie.name}
                        genres={movie.genres.join(', ')}
                        rating={movie.rating.average}
                        thumbnail={movie.image.original}
                        navigateToDetail={() => navigateToDetail(movie)}
                        addToFavorite={() => addToFavorites(movie)}
                        isFavorite={favoriteMovies.some((favMovie) => favMovie.id === movie.id) ? addToFavoriteIcon : removeToFavoriteIcon}
                    />
                ))}
            </div>

        </div>
    );
};

export default Favorite;
