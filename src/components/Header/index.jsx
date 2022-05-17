import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {Ctx} from "../../context";
import "./header.css";
import Search from "../Search";

export default () => {
    const {userId, setModalActive, path} = useContext(Ctx);
    return <header className="header-container">
        <Link to={path} className="logo"><i className="bi bi-blockquote-right"/>Super Blog</Link>
        {userId && <Search/>}
        <nav className="header-container__navigation">
            {
                userId && <>
                    <Link to={`${path}add`} title="Добавить пост">
                        <i className="bi bi-plus-circle-dotted"/>
                    </Link>
                    <Link to={`${path}posts`} title="Посты">
                        <i className="bi bi-postcard"/>
                    </Link>
                </>
            }
            {
                userId
                ? <Link to={`${path}profile`} title="Личный кабинет">
                    <i className="bi bi-person"/>
                  </Link>
                : <i className="bi bi-box-arrow-in-right" onClick={() => setModalActive(state => !state)} title="Войти"/>
            }

        </nav>
    </header>
}