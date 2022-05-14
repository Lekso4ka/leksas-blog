import React, {useContext} from "react";
import {Routes, Route} from "react-router-dom";
import Home from "../Home";
import Profile from "../Profile";
import Posts from "../Posts";
import Post from "../Post";
import AddPost from "../AddPost";
import Author from "../Author";
import {Ctx} from "../../context";

export default () => {
    const {userId, userToken} = useContext(Ctx);
    return <main className="main-container">
       <Routes>
           <Route path="/" element={<Home/>}/>
           <Route path="/posts" element={<Posts/>}/>
           <Route path="/add" element={<AddPost/>}/>
           <Route path="/profile" element={<Profile/>}/>
           <Route path="/posts/:id" element={<Post/>}/>
           <Route path="/author/:id" element={<Author/>}/>
       </Routes>
    </main>
}