    import React, { useEffect, useState } from 'react';
    import MovieCard from "../../components/MovieCard/MovieCard";
    import {useNavigate} from "react-router-dom";

    import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
    import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

    const Movies = () => {
        const [allMovies, setAllMovies] = useState([]);
        const [searchMovie, setSearchMovie] = useState([]);
        const [recentlyMovie, setRecentlyMovie] = useState([]);
        const navigate = useNavigate();
        const [currentPage, setCurrentPage] = useState(1);
        const [moviesPerPage] = useState(12);
        const [favoriteMovies, setFavoriteMovies] = useState([]);
    
        useEffect(() => {

            const fetchAllMovies = async () => {
                const storedFavorites = JSON.parse(localStorage.getItem('favoriteMovies'));
                if (storedFavorites) {
                    setFavoriteMovies(storedFavorites);
                }
                try {
                    const response = await fetch(`https://api.tvmaze.com/shows?page=${currentPage}&pageSize=${moviesPerPage}`);
                    const data = await response.json();
                    setAllMovies(data);
                } catch (error) {
                    console.error(error);
                }
            };

            const fetchRecentlyMovies = async () => {
                try {
                    const response = await fetch(`https://api.tvmaze.com/shows`);
                    const _data = await response.json();
                    const recentlyMovieData = _data
                        .filter((movie) => movie.premiered !== null)
                        .sort((a, b) => new Date(b.premiered) - new Date(a.premiered))
                        .slice(0, 20);
                    setRecentlyMovie(recentlyMovieData);
                } catch (error) {
                    console.error(error);
                }
            }
    
            fetchAllMovies();
            fetchRecentlyMovies();
        }, [currentPage]);

        function goToPreviousPage() {
            setCurrentPage(currentPage - 1);
        }

        function goToNextPage() {
            setCurrentPage(currentPage + 1);
        }
        function searchMovieFunction(movie)
        {
            let query = movie.target.value
    
            if (query !== '') {
                const fetchSearchMovies = async () => {
                    try {
                        const response = await fetch('https://api.tvmaze.com/search/shows?q=' + query);
                        const data = await response.json();
                        const movies = data.map((result) => result.show);
                        setSearchMovie(movies);
                    } catch (error) {
                        console.error(error);
                    }
                };
    
                fetchSearchMovies()
    
            }
            console.log(query)
        }
    
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
                <h2>Movies</h2>
                <input type="text" placeholder={'search'} onChange={searchMovieFunction}/>
    
                {searchMovie.length > 0 ? (
                    searchMovie.map((movie) => (
                        <div>
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
                        </div>
                    ))
                ) : (
                        ''
                )}

                {allMovies
                    .slice((currentPage - 1) * moviesPerPage, currentPage * moviesPerPage)
                    .map((movie) => (
                        <div>
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
                        </div>
                    ))}
                <button onClick={goToPreviousPage} disabled={currentPage === 1}>Previous Page</button>
                <button onClick={goToNextPage}>Next Page</button>
    
                <h2>Recently Movies</h2>
                {recentlyMovie.map((movie) => (
                    <div>
                        {movie.premiered}
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
                    </div>
                ) )}
    
            </div>
        );
    };
    
    export default Movies;
