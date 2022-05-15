import React, {useContext, useEffect, useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import {Ctx} from "../../context";
import "./profile.css";
import PostLine from "../PostLine";

export default () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({});
    const [changeName, updateName] = useState(false)
    const [name, setName] = useState("");
    const [changeAbout, updateAbout] = useState(false)
    const [about, setAbout] = useState("");
    const [changeImg, updateImg] = useState(false)
    const [img, setImg] = useState("");
    const menu = ["Мои посты", "Любимое", "Мои комментарии"];
    const [tab, setTab] = useState(menu[0]);
    const [comments, setComments] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [authorPosts, setAuthorPosts] = useState([]);

    const {setToken, setUser, api, userId, posts, path} = useContext(Ctx);
    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setToken("");
        setUser("");
        navigate(path);
    }
    useEffect(() => {
        api.getUser()
            .then(res => res.json())
            .then(ans => {
                setProfile(ans);
                setName(ans.name);
                setAbout(ans.about);
            })
    }, []);
    useEffect(() => {
        if (posts.length) {
            posts.forEach(p => {
                if (p.likes.includes(userId)) {
                    setFavorites(prev => {
                        return !prev.filter(fav => fav._id === p._id).length ? [...prev, p] : prev;
                    });
                }
            })
        }
    }, [posts]);
    useEffect(() => {
        if (posts.length) {
            posts.forEach(p => {
                if (p.author._id === userId) {
                    setAuthorPosts(prev => {
                        return !prev.filter(f => f._id === p._id).length ? [...prev, p] : prev;
                    });
                }
            })
        }
    }, [posts])
    useEffect(() => {
        api.getComments()
            .then(res => res.json())
            .then(ans => {
                ans.forEach(c => {
                    if (c.author._id === userId) {
                        api.getPost(c.post)
                            .then(res => res.json())
                            .then(post => {
                                c.post = post
                                setComments(prev => !prev.filter(f => f._id === c._id).length ? [...prev, c] : prev);
                            })
                    }
                });
            })
    }, [])
    const nameHandler = () => {
        updateName(false);
        if (name !== profile.name) {
            api.updateUserData({name: name, about: profile.about})
                .then(res => res.json())
                .then(ans => {
                    // console.log(ans);
                })
            setProfile(prev => {
                prev.name = name;
                return prev;
            });
        }
    }
    const aboutHandler = () => {
        updateAbout(false);
        if (about !== profile.about) {
            api.updateUserData({name: profile.name, about: about})
                .then(res => res.json())
                .then(ans => {
                    // console.log(ans);
                })
            setProfile(prev => {
                prev.about = about;
                return prev;
            });
        }
    }
    const setAvatar = (e) => {
        setImg(e.target.value);
        e.target.parentElement.style.backgroundImage = `url(${e.target.value})`;
    }
    const returnAvatar = (e) => {
        updateImg(false);
        setImg("");
        e.target.parentElement.style.backgroundImage = `url(${profile.avatar})`;
    }
    const imgHandler = () => {
        updateImg(false);
        api.updateUserImg({avatar: img})
            .then(res => res.json())
            .then(ans => {
                // console.log(ans);
            })
        setProfile(prev => {
            prev.avatar = img;
            return prev;
        });
    }
    return <div className="profile">
        <div className="author__container">
            <nav className="author__menu">
                {menu.map((el, i) => <div key={i} onClick={() => setTab(el)} className={tab === el ? "active" : ""}>{el}</div>)}
            </nav>
            {menu.map((el, i) => <div key={i} className={tab === el ? "author__block active" : "author__block"}>
                <h2>{el}</h2>
                <div className="author__content">
                    {el === "Мои комментарии"
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
                    {el === "Мои посты"
                        && authorPosts.length > 0
                        && authorPosts.map(post => <PostLine {...post} key={post._id}/>)}
                </div>
            </div>)}
        </div>
        <div className="profile__pic" style={{backgroundImage: `url(${profile.avatar})`}}>
            {!changeImg && <i className="bi bi-pencil-square" onClick={() => updateImg(true)}/>}
            {changeImg && <>
                <input value={img} onChange={setAvatar}/>
                <i className="bi bi-check2-square" onClick={imgHandler}/>
                <i className="bi bi-x-square" onClick={returnAvatar}/>
            </>}
        </div>
        <div className="profile__text">
            <div className="profile__line">
                {
                    !changeName
                    ? <>
                        <h1>{profile.name || ""}</h1>
                        <i className="bi bi-pencil-square" onClick={() => updateName(true)}/>
                    </>
                    : <>
                        <input value={name} onInput={e => setName(e.target.value)}/>
                        <i className="bi bi-check2-square" onClick={nameHandler}/>
                    </>
                }
            </div>
            <div className="profile__line">
                {
                    !changeAbout
                        ? <>
                            <p>{profile.about || ""}</p>
                            <i className="bi bi-pencil-square" onClick={() => updateAbout(true)}/>
                        </>
                        : <>
                            <input value={about} onInput={e => setAbout(e.target.value)}/>
                            <i className="bi bi-check2-square" onClick={aboutHandler}/>
                        </>
                }
            </div>
            <div>{profile.email || ""}</div>
            <span
                style={{cursor: "pointer", color: "blueviolet"}}
                onClick={logout}
            >
            Выйти
        </span>
        </div>

    </div>
}