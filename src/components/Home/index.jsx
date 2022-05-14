import React, {useContext} from "react";
import {Ctx} from "../../context";
import Auth from "./auth";
import Content from "./content";
import "./home.css";

export default () => {
    const {userId, userToken, setModalActive} = useContext(Ctx);
    return <>
        {userToken && userId ? <Content/> : <Auth openModal={setModalActive}/>}
    </>
}