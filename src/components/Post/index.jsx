import React, {useContext, useEffect, useState} from "react";
import {useParams, Link} from "react-router-dom";
import {Ctx} from "../../context";
import "./post.css";

export default () => {
    const {api, userId, setPosts, path} = useContext(Ctx);
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [likes, setLikes] = useState([]);
    const [like, setLike] = useState(false);
    const {id} = useParams();
    useEffect(() => {
        api.getPost(id)
            .then(res => res.json())
            .then(ans => {
                setPost(ans);
                if (ans.likes.includes(userId)) {
                    setLike(true);
                }
            })
    }, []);
    useEffect(() => {
        api.getCommentsByPost(id)
            .then(res => res.json())
            .then(ans => {
                ans.sort((a, b) => new Date(a) - new Date(b));
                setComments(ans);
            });
    }, [post]);
    useEffect(() => {
        if (post.likes) {
            if (post.likes.length) {
                post.likes.forEach(user => {
                    api.getUser(user)
                        .then(res => res.json())
                        .then(data => {
                            setLikes(prev => prev.includes(data.name).length  ? prev : [...prev, data.name]);
                        });
                })
            }
        }
    }, [post])
    const addComment = (e) => {
        e.preventDefault();
        api.addComment(id, {text: newComment})
            .then(res => res.json())
            .then(ans => {
                setPost(ans);
                setNewComment("");
            })
    }
    const deleteComment = (e) => {
        api.deleteComment(id, e.target.getAttribute("data-id"))
            .then(res => res.json())
            .then(ans => {
                setPost(ans);
            })
    }
    const updLike = () => {
        setLike(!like);
        api.setLike(id, like)
            .then(res => res.json())
            .then(ans => {
                setPost(ans);
                setPosts(prev => [...prev.filter(p => p._id !== ans._id), ans].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
            })
    }
    return <>
        <div className="post-container">
            <div className="post__pic" style={{backgroundImage: `url(${post.image})`}}/>
            <div className="post__text">
                <h1>{post.title || ""}</h1>
                {post.author && <div className="post__author">
                    <div className="post__author-pic" style={{backgroundImage: `url(${post.author.avatar})`}}/>
                    <Link to={post.author._id === userId ? `${path}profile` : `${path}author/${post.author._id}`}>{post.author.name}</Link>
                </div>}
                <p>{post.text || ""}</p>
                {post.tags && post.tags.length > 0 && <div className="post__tags">
                    {post.tags.map(t => <span key={t}>{t.trim()}</span>)}
                </div>}
                <div className="post__info">
                    {post.created_at && <p>Опубликовано: {new Date(post.created_at).toLocaleString()}</p>}
                    {post.created_at && new Date(post.created_at) !== new Date(post.updated_at) && <p>Обновлено: {new Date(post.updated_at).toLocaleString()}</p>}
                </div>
                <div className="post__feedback">
                    <p>
                        {post.likes && <>
                        <i style={{cursor: "pointer"}} className={like ? "bi bi-heart-fill" : "bi bi-heart"} onClick={updLike} title={`Нравится: ${likes.join(", ")}`}/>
                        {post.likes.length}
                        </>}
                    </p>
                    <p>
                        {post.comments && <><i className="bi bi-chat"/> {post.comments.length}</>}
                    </p>
                </div>
            </div>
            <div className="post__comments">
                <h2>Комментарии к посту</h2>
                {comments && comments.length > 0 && comments.map(c => <div className="comment" key={c._id}>
                    <div className="comment__name"><i className="bi bi-chat"/>
                        <Link to={c.author._id === userId ? `${path}profile` : `${path}author/${c.author._id}`}>{c.author.name}</Link>
                    </div>
                    <div className="comment__text">{c.text}</div>
                    <div className="comment__date">{new Date(c.created_at).toLocaleString()}</div>
                    {c.author._id === userId && <i className="bi bi-x-circle" onClick={deleteComment} data-id={c._id}/>}
                </div>)}
                <div className="comment">
                    <div className="comment__name comment__name_little"><i className="bi bi-chat"/>Добавить комментарий</div>
                    <form onSubmit={addComment}>
                        <textarea value={newComment} onInput={e => setNewComment(e.target.value)}/>
                        <button type="submit">Отправить</button>
                    </form>
                </div>
            </div>
        </div>
    </>
}