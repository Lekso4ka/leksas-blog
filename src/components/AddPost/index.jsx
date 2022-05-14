import React, {useContext, useState} from "react";
import {Ctx} from "../../context";
import "./post.css";
export default () => {
    const {api, setPosts} = useContext(Ctx);
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [img, setImg] = useState("");
    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState("");
    const addTag = e => {
        let text = e.target.value;
        let last = text[text.length - 1]
        if (last === " " || last === "," || last === ";") {
            if (!tags.includes(text.slice(0, text.length - 1))) {
                setTags(prev => [...prev, text.slice(0, text.length - 1)]);
            }
            setTag("");
        } else {
            setTag(text);
        }
    }
    const deleteTag = e => {
        e.target.remove();
    }
    const addPost = e => {
        e.preventDefault();
        if (title && text) {
            const body = {
                title: title,
                text: text
            }
            if (img) {
                body.image = img;
            }
            if (tags.length) {
                body.tags = tag ? [...tags, tag] : tags;
            }
            console.log(body);
            api.addPost(body)
                .then(res => res.json())
                .then(ans => {
                    setPosts(prev => [...prev, ans].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)))
                    setTags([]);
                    setTag("");
                    setImg("");
                    setTitle("");
                    setText("");
                })
        }
    }
    return <form className="post-form" onSubmit={addPost}>
        <h1>Новый пост</h1>
        <div className="form__img" style={{backgroundImage: img && `url(${img})`}}>
            {!img && <i className="bi bi-image"/>}
        </div>
        <div className="form__line">
            <label htmlFor="image">Изображение</label>
            <input value={img} id="image" placeholder="Ссылка на изображение" onInput={e => setImg(e.target.value)}/>
        </div>
        <div className="form__line">
            <label htmlFor="tags">Теги</label>
            <input value={tag} id="tags" placeholder="Введите теги через запятую или пробел" onInput={addTag}/>
        </div>
        <div className="form__line">
            <label htmlFor="title">Заголовок</label>
            <input value={title} id="title" placeholder="Название поста" onInput={e => setTitle(e.target.value)}/>
        </div>
        <div className="form__block">
            <div  className="form__tags">
                {tags.map(tg => <span className="form__tag" key={tg} onClick={deleteTag} title="удалить">{tg}</span>)}
            </div>
            <button className="form__btn" type="submit">Создать пост</button>
        </div>
        <div className="form__line">
            <label htmlFor="text">Текст</label>
            <textarea value={text} id="text" placeholder="Пост" onInput={e => setText(e.target.value)}/>
        </div>
    </form>
}