import React, { useState, useEffect } from 'react';
import MovieCard from "../MovieCard/MovieCard";
import {useNavigate} from "react-router-dom";

const BestRatingMovies = () => {
    const [bestRatingMovies, setMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBestRatingMovies = async () => {
            try {
                const response = await fetch('https://api.tvmaze.com/shows');
                const data = await response.json();
                const bestRatingMoviesData = data
                    .filter((movie) => movie.rating.average !== null)
                    .sort((a, b) => b.rating.average - a.rating.average)
                    .slice(0, 20);
                setMovies(bestRatingMoviesData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchBestRatingMovies();
    }, []);

    function navigateToDetail(movie) {
        navigate(`/detail`, { state: { movie } });
    }

    return (
        <div>
            <h1>Top 20 Movies</h1>
            <ul>
                {bestRatingMovies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        title={movie.name}
                        genres={movie.genres.join(', ')}
                        rating={movie.rating.average}
                        thumbnail={movie.image.original}
                        navigateToDetail={() => navigateToDetail(movie)} />
                ))}
            </ul>
        </div>
    );
};

export default BestRatingMovies;
