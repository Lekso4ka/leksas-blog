import React, {useContext, useEffect, useState} from "react";
import {Ctx} from "../../context";
import usePagination from "../../hooks/usePagination";
import PostLine from "../PostLine";
import Pagination from "../Pagination";
import "./posts.css"
import {Link} from "react-router-dom";

export default () => {
    const {posts, userId, path} = useContext(Ctx);
    const [authors, setAuthors] = useState([]);
    const [tags, setTags] = useState([]);
    const [fPosts, filterPosts] = useState(posts);
    const [filter, setFilter] = useState("");
    const [fType, setFType] = useState("");
    const [sort, setSort] = useState("new");
    const [page, setPage] = useState(1);
    const data = usePagination(fPosts, 10);
    const getNumber = (max = 256, min = 0) => Math.floor((Math.random() * (max - min)) + min);
    const getColor = (a = 20) => {
        return `rgba(${getNumber(200,100)},${getNumber(100, 0)},${getNumber(256,250)},${a/100})`;
    }
    useEffect(() => {
        let arr = [];
        let tg = [];
        posts.forEach(post => {
            if (!arr.filter(el => el._id === post.author._id).length) {
                if (post.author.name !== "Иван Иванов") {
                    arr.push(post.author);
                }
            }
            post.tags.forEach(t => {
                let tgs = t.split(/[\s,\.!]/);
                tgs.forEach(el => {
                    if (el) {
                        if (!tg.includes(el.toLowerCase())) {
                            tg.push(el.toLowerCase());
                        }
                    }
                })
            });
        });
        tg.sort();
        arr.sort((a, b) => {
            if (a.name > b.name) {
                return 1;
            } else {
                return -1;
            }
        });
        setAuthors(arr);
        setTags(tg);
        fPosts.length === 0 && filterPosts([...posts]);
    }, [posts])
    const filterByTag = (e) => {
        let text = e.target.textContent
        console.log(text);
        setFType("Посты по тегу");
        setFilter(text);
        let filter = [];
        posts.forEach(el => {
            let data = el.tags.filter(tg => tg.toLowerCase().includes(text));
            if (data.length) {
                filter.push(el);
            }
        });
        filterPosts(filter);
        setPage(1);
        data.jump(1);
    }
    const filterByAuthor = (e) => {
        let text = e.target.textContent;
        setFType("Посты автора");
        setFilter(text);
        filterPosts(posts.filter(p => p.author.name === text));
        setPage(1);
        data.jump(1);
    }
    const removeFilter = () => {
        setFType("");
        setFilter("");
        filterPosts([...posts]);
        setPage(1);
        data.jump(1);
    }
    return <div className="container">
        <div className="posts-filter">
            <h2>Авторы</h2>
            <div className="posts-filter__authors">
                {authors.map(a => <div key={a._id} onClick={filterByAuthor}>
                    {a.name}
                    <Link to={`${path}author/${a._id}`}>
                        <i className="bi bi-box-arrow-in-right" title="На страницу автора"/>
                    </Link>
                </div>)}
            </div>
            <h2>Теги</h2>
            <div className="posts-filter__tags">
                {tags.map(tg => <span key={tg} style={{backgroundColor: getColor()}} onClick={filterByTag}>{tg}</span>)}
            </div>
        </div>
        <div className="posts-container">
            {filter && fType ? <h1>{fType} <span className="post-container__filter" title="Сбросить фильтр" onClick={removeFilter}>{filter}</span></h1> : <h1>Все посты</h1>}
            <div className="posts-container__sort">
                <i className={`bi ${sort === "new" ? "bi-calendar-plus-fill" : "bi-calendar-plus"}`} title="Новые посты" onClick={() => setSort("new")}/>
                <i className={`bi ${sort === "old" ? "bi-calendar-minus-fill" : "bi-calendar-minus"}`} title="Старые посты" onClick={() => setSort("old")}/>
                <i className={`bi ${sort === "like" ? "bi-calendar-heart-fill" : "bi-calendar-heart"}`} title="Популярные посты" onClick={() => setSort("like")} />
            </div>
            {data.current(sort).map(post => <PostLine key={post._id} {...post}/>)}
            <Pagination page={page} changePage={setPage} hook={data}/>
        </div>
    </div>
}