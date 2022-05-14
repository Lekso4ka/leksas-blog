import React from "react";
import {Link} from "react-router-dom";

export default () => {
    return <footer className="footer-container">
        ©{new Date().getFullYear()}
    </footer>
}