import React from 'react';
import BestRatingMovies from "../../components/BestRatingMovies/BestRatingMovies";
import HorrorCategoryMovies from "../../components/HorrorCategoryMovies/HorrorCategoryMovies";
import Recommendation from "../../components/Recommendation/Recommendation";

const Home = () => {

    return (
        <div>
            <BestRatingMovies />
            <HorrorCategoryMovies/>
            <Recommendation />
        </div>
    );
};

export default Home;
