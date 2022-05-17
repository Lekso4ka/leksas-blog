import React, {useContext, useEffect, useState} from "react";
import {Ctx} from "../../context";
import PostCard from "../PostCard";

export default () => {
    const {posts, userId} = useContext(Ctx);
    const [userPosts, setUserPosts] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [popular, setPopular] = useState([]);
    useEffect(() => {
        console.log("upd");
        setUserPosts(posts.filter(post => post.author._id === userId))
        let pop = [...posts];
        pop.sort((a, b) => (b.likes.length + b.comments.length) - (a.likes.length + a.comments.length));
        setPopular(pop);
        setFavorites(posts.filter(post => post.likes.includes(userId)));
    }, [posts]);
    return <div className="home-container">
        <div className="main-line">
            <h2>Новые посты</h2>
            <div className="main-posts">
                {posts.slice(0, 3).map(post => <PostCard key={post._id} {...post}/>)}
            </div>
        </div>
        <div className="main-line">
            <h2>Популярные посты</h2>
            <div className="main-posts">
                {popular.slice(0, 3).map(post => <PostCard key={post._id} {...post}/>)}
            </div>
        </div>
        {userPosts.length > 0 && <div className="main-line">
            <h2>Мои посты</h2>
            <div className="main-posts">
                {userPosts.slice(0, 3).map(post => <PostCard key={post._id} {...post}/>)}
            </div>
        </div>}
        {favorites.length > 0 && <div className="main-line">
            <h2>Любимые посты</h2>
            <div className="main-posts">
                {favorites.slice(0, 3).map(post => <PostCard key={post._id} {...post}/>)}
            </div>
        </div>}
    </div>
}