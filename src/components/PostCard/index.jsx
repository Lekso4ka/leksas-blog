import React, {useContext, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import "./post-card.css"
import defaultImg from "../../assets/image.svg"
import {Ctx} from "../../context";

export default (props) => {
    const {api, userId, setPosts, path} = useContext(Ctx);
    const [post, setPost] = useState(props);
    const [like, setLike] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (post.likes && post.likes.length) {
            if (post.likes.includes(userId)) {
                setLike(true);
            }
        }
    }, [post])
    const updLike = (e) => {
        e.stopPropagation();
        setLike(!like);
        api.setLike(props._id, like)
            .then(res => res.json())
            .then(ans => {
                setPost(ans);
                setPosts(prev => [...prev.filter(p => p._id !== ans._id), ans].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
            })
    }
    const openCard = () => {
        console.log("opn")
        navigate(`${path}posts/${props._id}`);
    }
    return <>
        <div className="post-card">
            <div className="post-card__pic" style={{backgroundImage: post.image && `url(${post.image})`}}>
                <div className="post-card__default" style={{backgroundImage: `url(${defaultImg})`}}/>
            </div>
            <div className="post-card__text">
                <h3 onClick={openCard}>{post.title || ""}</h3>
                <div className="post-card__read" onClick={openCard}>
                    {post.text && post.text.slice(0, 40) + (post.text.length >= 40 ? "..." : "")}
                </div>
                <div className="post-card__info">
                        {post.author && <Link to={`${path}author/${post.author._id}`} className="post-card__author">{post.author.name}</Link>}
                </div>
                <div className="post-card__info">
                    <p>{new Date(post.created_at || null).toLocaleDateString()}</p>
                </div>
            </div>
            <div className="post-card__feedback">
                <p>
                    <i className={like ? "bi bi-heart-fill" : "bi bi-heart"} onClick={updLike} style={{cursor: "pointer"}}/>
                    {post.likes && post.likes.length}
                </p>
                <p>
                    <i className="bi bi-chat"/> {post.comments && post.comments.length}
                </p>
            </div>
        </div>
    </>
}