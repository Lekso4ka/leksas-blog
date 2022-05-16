import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import "./post-line.css"
import defaultImg from "../../assets/image.svg"
import {Ctx} from "../../context";

export default (props) => {
    const {api, userId, setPosts, path} = useContext(Ctx);
    const [post, setPost] = useState(props);
    const [like, setLike] = useState(false);
    useEffect(() => {
        if (post.likes && post.likes.length) {
            if (post.likes.includes(userId)) {
                setLike(true);
            }
        }
    }, [post])
    const updLike = () => {
        setLike(!like);
        api.setLike(props._id, like)
            .then(res => res.json())
            .then(ans => {
                setPost(ans);
                setPosts(prev => [...prev.filter(p => p._id !== ans._id), ans].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
            })
    }
    const deletePost = (e) => {
        let del = confirm("Вы действительно хотите удалить пост?");
        if (del) {
            api.deletePost(e.target.getAttribute("data-id"))
                .then(res => res.json())
                .then(ans => {
                    setPosts(prev => prev.filter(p => p._id !== ans._id));
                })
        }
    }
    return <>
        <div className="post-line">
            <div className="post-line__pic" style={{backgroundImage: post.image && `url(${post.image})`}}>
                <div className="post-line__default" style={{backgroundImage: `url(${defaultImg})`}}/>
            </div>
            <div className="post-line__text">
                <h3>{post.title || ""}</h3>
                <p>{post.text && post.text.slice(0, 50) + (post.text.length >= 50 ? "..." : "")}</p>
                <div className="post-line__info">
                    <p>
                        {post.author && <Link to={`${path}author/${post.author._id}`} className="post-line__author">{post.author.name}</Link>}
                        {new Date(post.created_at || null).toLocaleDateString()}
                    </p>
                    <div className="post-line__feedback">
                        <p>
                            <i className={like ? "bi bi-heart-fill" : "bi bi-heart"} onClick={updLike} style={{cursor: "pointer"}}/>
                            {post.likes && post.likes.length}
                        </p>
                        <p>
                            <i className="bi bi-chat"/> {post.comments && post.comments.length}
                        </p>
                    </div>
                </div>
            </div>
            <div className="post-line__read">
                <Link to={`${path}posts/${props._id}`}>Читать дальше</Link>
            </div>
            {post.author._id === userId && <Link to={`${path}update/${post._id}`} className="edit"><i className="bi bi-pencil-square"/></Link>}
            {post.author._id === userId && <i className="bi bi-x-circle" onClick={deletePost} data-id={post._id}/>}
        </div>
    </>
}