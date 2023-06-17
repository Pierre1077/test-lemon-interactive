import React, { useState, useEffect, useRef } from 'react';
import MovieCard from "../MovieCard/MovieCard";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import SwiperCore, {  Navigation } from 'swiper';
import 'swiper/swiper.min.css';
import 'swiper/swiper-bundle.min.css';
import Swiper from 'swiper';

SwiperCore.use([Navigation]);

const BestRatingMovies = () => {
    const [bestRatingMovies, setMovies] = useState([]);
    const navigate = useNavigate();
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const swiperRef = useRef(null);

    useEffect(() => {
        const fetchBestRatingMovies = async () => {
            const storedFavorites = JSON.parse(localStorage.getItem('favoriteMovies'));
            if (storedFavorites) {
                setFavoriteMovies(storedFavorites);
            }
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

    useEffect(() => {
        const swiper = new Swiper(swiperRef.current, {
            slidesPerView: 4,
            spaceBetween: 16,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });

        return () => {
            swiper.destroy();
        };
    }, []);

    return (
        <div style={{width: "90%", margin: '0 auto'}}>
            <h1>Top 20 Movies</h1>
            <div className="swiper mySwiper" ref={swiperRef} >
                <div className="swiper-wrapper">
                    {bestRatingMovies.map((movie) => (
                        <div className="swiper-slide" key={movie.id}>
                            <MovieCard
                                title={movie.name}
                                genres={movie.genres.join(', ')}
                                rating={movie.rating.average}
                                thumbnail={movie.image.original}
                                navigateToDetail={() => navigateToDetail(movie)}
                                addToFavorite={() => addToFavorites(movie)}
                                isFavorite={favoriteMovies.some((favMovie) => favMovie.id === movie.id) ? addToFavoriteIcon : removeToFavoriteIcon}
                            />
                        </div>
                    ))}
                </div>

                <div className="swiper-button-next"></div>
                <div className="swiper-button-prev"></div>
            </div>
        </div>
    );
};

export default BestRatingMovies;
