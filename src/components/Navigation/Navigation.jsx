import React from 'react';
import {NavLink} from "react-router-dom";
import './Navigation.css'

const Navigation = () => {
    return (
        <div className="navigation__wrapper">
            <div>
                <ul>
                    <NavLink to="/">
                        <li>Home</li>
                    </NavLink>
                    <NavLink to="/favorite">
                        <li>Favorite</li>
                    </NavLink>
                    <NavLink to="/movies">
                        <li>Movies</li>
                    </NavLink>

                </ul>
            </div>
        </div>
    );
};

export default Navigation;