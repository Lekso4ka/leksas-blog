import React, {useContext} from "react";
import {Routes, Route} from "react-router-dom";
import Home from "../Home";
import Profile from "../Profile";
import Posts from "../Posts";
import Post from "../Post";
import AddPost from "../AddPost";
import UpdatePost from "../UpdatePost";
import Author from "../Author";
import {Ctx} from "../../context";

export default () => {
    const {path} = useContext(Ctx);
    return <main className="main-container">
       <Routes>
           <Route path={path} element={<Home/>}/>
           <Route path={`${path}posts`} element={<Posts/>}/>
           <Route path={`${path}add`} element={<AddPost/>}/>
           <Route path={`${path}profile`} element={<Profile/>}/>
           <Route path={`${path}posts/:id`} element={<Post/>}/>
           <Route path={`${path}update/:id`} element={<UpdatePost/>}/>
           <Route path={`${path}author/:id`} element={<Author/>}/>
       </Routes>
    </main>
}