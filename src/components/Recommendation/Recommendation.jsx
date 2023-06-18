import React, { useEffect, useState } from 'react';
import MovieCard from "../MovieCard/MovieCard";
import {useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

const Recommendation = () => {
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [recommendationMovies, setRecommendationMoviesData] = useState([]);
    const navigate = useNavigate();

    const favoriteCategories = Array.from(
        new Set(favoriteMovies.map((favMovie) => favMovie.genres).flat())
    );

    useEffect(() => {
        const fetchRecommendationMovies = async () => {
            const storedFavorites = JSON.parse(localStorage.getItem('favoriteMovies'));
            if (storedFavorites) {
                setFavoriteMovies(storedFavorites);
            }
            try {
                const response = await fetch('https://api.tvmaze.com/shows');
                const data = await response.json();
                const recommendationMoviesData = data
                    .filter((movie) =>
                        movie.genres.some((genre) => favoriteCategories.includes(genre))
                    )
                    .slice(0, 20);
                console.log(recommendationMoviesData)
                setRecommendationMoviesData(recommendationMoviesData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchRecommendationMovies();
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

            <h2>Recommendation Movies</h2>
            <div style={{display: "flex"}}>
                {recommendationMovies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        title={movie.name}
                        genres={movie.genres ? movie.genres.join(', ') : ''}
                        rating={movie.rating ? movie.rating.average : ''}
                        navigateToDetail={() => navigateToDetail(movie)}
                        thumbnail={movie.image ? movie.image.original : 'https://via.placeholder.com/100'}
                        addToFavorite={() => addToFavorites(movie)}
                        isFavorite={favoriteMovies.some((favMovie) => favMovie.id === movie.id) ? addToFavoriteIcon : removeToFavoriteIcon}
                    />
                ))}
            </div>

        </div>
    );
};

export default Recommendation;
