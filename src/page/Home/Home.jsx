import React from 'react';
import BestRatingMovies from "../../components/BestRatingMovies/BestRatingMovies";
import HorrorCategoryMovies from "../../components/HorrorCategoryMovies/HorrorCategoryMovies";

const Home = () => {

    return (
        <div>
            <BestRatingMovies />
            <HorrorCategoryMovies/>
        </div>
    );
};

export default Home;
