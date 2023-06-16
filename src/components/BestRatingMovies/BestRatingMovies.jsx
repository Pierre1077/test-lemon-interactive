import React, { useState, useEffect } from 'react';

const BestRatingMovies = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch('https://api.tvmaze.com/shows');
                const data = await response.json();
                console.log(data)
                const sortedMovies = data
                    .filter((movie) => movie.rating.average !== null)
                    .sort((a, b) => b.rating.average - a.rating.average)
                    .slice(0, 20);
                setMovies(sortedMovies);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMovies();
    }, []);

    return (
        <div>
            <h1>Top 20 Movies</h1>
            <ul>
                {movies.map((movie) => (
                    <li key={movie.id}>
                        {movie.name} - Rating: {movie.rating.average}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BestRatingMovies;
