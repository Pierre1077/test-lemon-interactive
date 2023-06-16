import React, { useState, useEffect } from 'react';
import MovieCard from "../MovieCard/MovieCard";
import {useNavigate} from "react-router-dom";

const HorrorCategoryMovies = () => {
    const [horrorCategoryMovies, setHorrorCategoryMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHorrorCategoryMovies = async () => {
            try {
                const response = await fetch('https://api.tvmaze.com/shows');
                const data = await response.json();
                const filteredMovies = data.
                filter(movie => movie.genres.includes('Horror'))
                .slice(0, 20);
                setHorrorCategoryMovies(filteredMovies);
            } catch (error) {
                console.error(error);
            }
        };

        fetchHorrorCategoryMovies();
    }, []);

    function navigateToDetail() {
        navigate('/detail');
    }

    return (
        <div>
            <h1>Horror Movies</h1>
            <ul>
                {horrorCategoryMovies.map((movie, index) => (
                    <MovieCard
                        key={movie.id}
                        title={movie.name}
                        genres={movie.genres.join(', ')}
                        rating={movie.rating.average}
                        navigateToDetail={() => navigateToDetail(movie)}
                        thumbnail={movie.image.original}
                    />
                ))}
            </ul>
        </div>
    );
};

export default HorrorCategoryMovies;
