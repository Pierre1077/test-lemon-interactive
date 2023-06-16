import React from 'react';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ title, genres, rating, navigateToDetail }) => {
    const navigate = useNavigate();



    return (
        <div>
            <h2>{title}</h2>
            <p>Genre : {genres}</p>
            <p>Note : {rating}</p>
            <div>
                <button onClick={navigateToDetail}>
                    Détail
                </button>
            </div>
        </div>
    );
};

export default MovieCard;
