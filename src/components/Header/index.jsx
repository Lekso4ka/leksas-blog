import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {Ctx} from "../../context";
import "./header.css";

export default () => {
    const {userId, setModalActive} = useContext(Ctx);
    return <header className="header-container">
        <Link to="/">Logo</Link>
        <nav className="header-container__navigation">
            {
                userId && <>
                    <Link to="/add" title="Добавить пост">
                        <i className="bi bi-plus-circle-dotted"/>
                    </Link>
                    <Link to="/posts" title="Посты">
                        <i className="bi bi-postcard"/>
                    </Link>
                </>
            }
            {
                userId
                ? <Link to="/profile" title="Личный кабинет">
                    <i className="bi bi-person"/>
                  </Link>
                : <i className="bi bi-box-arrow-in-right" onClick={() => setModalActive(state => !state)} title="Войти"/>
            }

        </nav>
    </header>
}