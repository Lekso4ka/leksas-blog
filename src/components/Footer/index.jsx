import React from "react";
import {Link} from "react-router-dom";

export default () => {
    return <footer className="footer-container">
        ©2022
        <span className="footer-author">
            Made by
            <a href="mailto:lexysnake@gmail.com">Leksa</a>
            with
            <i className="bi bi-heart-fill"/>
        </span>
    </footer>
}