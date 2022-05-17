import React, {useState, useContext} from "react";
import {Ctx} from "../../context";
import "./search.css";
import {useNavigate, } from "react-router-dom";
export default () => {
    const {posts, searchText, setSearchText, authors, tags, path} = useContext(Ctx);
    const [postsByTitle, setPostsByTitle] = useState([]);
    const [postsByAuthor, setPostsByAuthor] = useState([]);
    const [postsByTags, setPostsByTags] = useState([]);
    const navigate = useNavigate();
    const search = (e) => {
        setSearchText(e.target.value)
        setPostsByTitle(posts.filter(p => p.title.toLowerCase().includes(e.target.value.toLowerCase())));
        setPostsByAuthor(authors.filter(a => a.name.toLowerCase().includes(e.target.value.toLowerCase())));
        console.log(tags);
        setPostsByTags(tags.filter(t => t.includes(e.target.value.toLowerCase())));
    }
    const showContent = e => {
        let type = e.target.id;
        let id = e.target.getAttribute("data-name");
        setSearchText("");
        setPostsByTitle([]);
        setPostsByAuthor([]);
        setPostsByTags([]);
        switch (type) {
            case "post": return navigate(`${path}posts/${id}`, { replace: true });
            case "author": navigate(`${path}author/${id}`, { replace: true }); break;
        }
    }
    return <div className="search">
        <input type="text" value={searchText} onInput={search}/>
        {searchText && <div className="search-container">
            {postsByTitle.length > 0 && <div className="search__block">
                <h3>Подходящие посты</h3>
                {postsByTitle.slice(0, 10).map(p => <div className="search__link" id="post" onClick={showContent} data-name={p._id} key={p._id}>{p.title}</div>)}
            </div>}
            {postsByAuthor.length > 0 && <div className="search__block">
                <h3>Авторы</h3>
                {postsByAuthor.slice(0, 5).map(a => <div className="search__link" id="author" data-name={a._id} key={a._id} onClick={showContent}>{a.name}</div>)}
            </div>}
            {postsByTags.length > 0 && <div className="search__block">
                <h3>Теги</h3>
                {postsByTags.slice(0, 5).map(t => <div key={t}>{t}</div>)}
            </div>}
        </div>}
    </div>
}