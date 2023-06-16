import React from 'react';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ title, genres, rating, thumbnail, navigateToDetail, addToFavorite }) => {
    const navigate = useNavigate();



    return (
        <div>
            <h2>{title}</h2>
            <img src={thumbnail} alt="" width={100}/>
            <p>Genre : {genres}</p>
            <p>Note : {rating}</p>
            <div>
                <button onClick={navigateToDetail}>
                    Detail
                </button>
            </div>
            <div>
                <button onClick={addToFavorite}>
                    Favorite
                </button>
            </div>
        </div>
    );
};

export default MovieCard;
