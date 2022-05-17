import React, {useEffect, useState} from "react";
import {Ctx} from "./context";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import Api from "./Api";
import "./index.css";

export default () => {
    const [user, setUser] = useState(localStorage.getItem("user") || "");
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [posts, setPosts] = useState([]);
    const [text, setText] = useState("");
    const [authors, setAuthors] = useState([]);
    const [tags, setTags] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [api, setApi] = useState(new Api(token));
    const [modalActive, setModalActive] = useState(false);
    const [popupActive, setPopupActive] = useState(false);
    useEffect(() => {
        setApi(new Api(token));
    }, [token]);
    useEffect(() => {
        if (token) {
            api.getPosts()
                .then(res => res.json())
                .then(ans => {
                    ans.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                    setPosts(ans);
                    let tgs = [];
                    ans.forEach(p => {
                        p.tags.forEach(t => {
                            if (t) {
                                if (!tgs.filter(tg => tg === t.trim().toLowerCase()).length) {
                                    tgs.push(t.trim().toLowerCase());
                                }
                            }
                        });
                    })
                    setTags(tgs);
                })
            api.getUsers()
                .then(res => res.json())
                .then(ans => setAuthors(ans));
        }
    }, [api]);
    return <>
        <Ctx.Provider value={{
            userId: user,
            setUser: setUser,
            userToken: token,
            setToken: setToken,
            posts: posts,
            modalActive: modalActive,
            popupActive: popupActive,
            setPosts: setPosts,
            favorites: favorites,
            setFavorites: setFavorites,
            searchText: text,
            authors: authors,
            setAuthors: setAuthors,
            setSearchText: setText,
            setModalActive: setModalActive,
            setPopupActive: setPopupActive,
            api: api,
            tags: tags,
            setTags: setTags,
            path: "/leksas-blog/"
            // path: "/"
        }}>
            <Header/>
            <Main/>
            <Footer/>
            <Modal type="auth" />
        </Ctx.Provider>
    </>
}