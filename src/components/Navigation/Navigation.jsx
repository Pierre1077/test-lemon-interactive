import React from 'react';
import {NavLink} from "react-router-dom";

const Navigation = () => {
    return (
        <div>
            <div>

                <ul>
                    <NavLink to="/">
                        <li>Home</li>
                    </NavLink>
                    <NavLink to="/favorite">
                        <li>Favorite</li>
                    </NavLink>

                </ul>
            </div>
        </div>
    );
};

export default Navigation;