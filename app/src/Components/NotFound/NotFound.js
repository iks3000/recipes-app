import "./NotFound.css";

import React from "react";
import { NavLink } from "react-router-dom";

function NotFound() {
    return (
        <div className="NotFound">
            <h2>
                OOps!!! Page you want to see can't be found on the server
            </h2>
            <p>
                Try to navigate <NavLink to="/">Home</NavLink> and try again.
            </p>
        </div>
    )
}


export default NotFound;