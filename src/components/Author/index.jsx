import React, {useContext, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {Ctx} from "../../context";
import "./author.css";
import PostLine from "../PostLine";

export default () => {
    const {id} = useParams();
    const [profile, setProfile] = useState({});
    const menu = ["Посты", "Любимое", "Комментарии"];
    const [tab, setTab] = useState(menu[0]);
    const [comments, setComments] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [authorPosts, setAuthorPosts] = useState([]);
    const {api, posts, path} = useContext(Ctx);
    useEffect(() => {
        api.getUser(id)
            .then(res => res.json())
            .then(ans => {
                setProfile(ans);
            })
    }, []);
    useEffect(() => {
        if (posts.length) {
            posts.forEach(p => {
                if (p.likes.includes(id)) {
                    setFavorites(prev => {
                        return !prev.filter(f => f._id === p._id).length ? [...prev, p] : prev;
                    });
                }
            })
        }
    }, [posts]);
    useEffect(() => {
        if (posts.length) {
            posts.forEach(p => {
                if (p.author._id === id) {
                    setAuthorPosts(prev => {
                        return !prev.filter(f => f._id === p._id).length ? [...prev, p] : prev;
                    })
                }
            })
        }
    }, [posts])
    useEffect(() => {
        api.getComments()
            .then(res => res.json())
            .then(ans => {
                ans.forEach(c => {
                    if (c.author._id === id) {
                        if (posts.filter(p => p._id === c.post).length) {
                            api.getPost(c.post)
                                .then(res => res.json())
                                .then(post => {
                                    c.post = post;
                                    setComments(prev => !prev.filter(f => f._id === c._id).length ? [...prev, c] : prev)
                                })
                        }
                    }
                });
            })
    }, [posts])

    return <div className="author">
        <div className="author__info">
            <h1>{profile.name || ""}</h1>
            <p>{profile.about || ""}</p>
            {profile.email && <a href={`mailto:${profile.email}`}>{profile.email}</a>}
        </div>
        {profile.avatar && <img className="author__pic" src={profile.avatar} alt={profile.name || ""}/>}
        <div className="author__container">
            <nav className="author__menu">
                {menu.map((el, i) => <div key={i} onClick={() => setTab(el)} className={tab === el ? "active" : ""}>{el}</div>)}
            </nav>
            {menu.map((el, i) => <div key={i} className={tab === el ? "author__block active" : "author__block"}>
                <h2>{el}</h2>
                <div className="author__content">
                {el === "Комментарии"
                    && comments.length > 0
                    && comments.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map(c => <div className="author__comment" key={c._id}>
                        <p className="author__comment_text">
                            <i className="bi bi-chat-left-quote"/>
                            {c.text}
                        </p>
                        <p>К посту: «<Link to={`${path}posts/${c.post._id}`}>{c.post.title}</Link>»</p>
                        <p>{new Date(c.created_at).toLocaleString()}</p>
                    </div>)
                }
                {el === "Любимое"
                    && favorites.length > 0
                    && favorites.map(post => <PostLine {...post} key={post._id}/>)
                }
                {el === "Посты"
                    && authorPosts.length > 0
                    && authorPosts.map(post => <PostLine {...post} key={post._id}/>)}
                </div>
            </div>)}
        </div>

    </div>
}