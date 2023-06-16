import React from 'react';
import { useLocation } from 'react-router-dom';

const Detail = () => {
    const location = useLocation();
    const movie = location.state.movie;

    return (
        <div>
            <h2>Page de détail pour le film</h2>
            <h3>{movie.name}</h3>
        </div>
    );
};

export default Detail;
