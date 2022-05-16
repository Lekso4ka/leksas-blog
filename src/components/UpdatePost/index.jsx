import React, {useContext, useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {Ctx} from "../../context";
// import "./post.css";
export default () => {
    const {api, setPosts, path} = useContext(Ctx);
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [img, setImg] = useState("");
    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState("");
    const {id} = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        api.getPost(id)
            .then(res => res.json())
            .then(ans => {
                setTitle(ans.title);
                setText(ans.text);
                setImg(ans.image);
                setTags(ans.tags);
            })
    }, []);
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
        let text = e.target.textContent;
        setTags(prev => prev.filter(t => t !== text));
    }
    const updatePost = e => {
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
            api.updatePost(id, body)
                .then(res => res.json())
                .then(ans => {
                    setPosts(prev => [prev.filter(p => p._id !== id), ans].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)))
                })
        }
    }
    return <form className="post-form" onSubmit={updatePost}>
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
            <div className="form__buttons">
                <button className="form__btn" type="button" onClick={() => navigate(`${path}posts/${id}`)}>Отменить</button>
                <button className="form__btn" type="submit">Обновить</button>
            </div>
        </div>
        <div className="form__line">
            <label htmlFor="text">Текст</label>
            <textarea value={text} id="text" placeholder="Пост" onInput={e => setText(e.target.value)}/>
        </div>
    </form>
}