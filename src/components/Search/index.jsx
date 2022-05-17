import React, {useState, useContext} from "react";
import {Ctx} from "../../context";
// import "./banner.css";
export default () => {
    const {posts} = useContext(Ctx);
    const [text, setText] = useState("");
    const [postsByTitle, setPostsByTitle] = useState([]);
    const [postsByAuthor, setPostsByAuthor] = useState([]);
    const [postsByTags, setPostsByTags] = useState([]);
    const search = (e) => {
        setText(e.target.value)
        setPostsByTitle(posts.filter(p => p.title.toLowerCase().includes(e.target.value.toLowerCase())));
        setPostsByAuthor(posts.filter(p => p.author.name.toLowerCase().includes(e.target.value.toLowerCase())));
        setPostsByTags(posts.filter(p => {
            console.log(p.tags);
            let tags = p.tags.filter(el => el.includes(e.target.value.toLowerCase()));
            return tags.length > 0;
        }));
    }
    return <div className="search">
        <input type="text" value={text} onInput={search}/>
        <div className="search-container">
            {postsByTitle.length > 0 && <div>
                <h3>Подходящие посты</h3>
                {postsByTitle.map(p => <div key={p._id}>{p.title}</div>)}
            </div>}
            {postsByAuthor.length > 0 && <div>
                <h3>Авторы</h3>
                {postsByAuthor.map(p => <div key={p._id}>{p.author.name}</div>)}
            </div>}
            {postsByTags.length > 0 && <div>
                <h3>Теги</h3>
                {postsByTags.map(p => <div key={p._id}>{p.title}</div>)}
            </div>}
        </div>
    </div>
}