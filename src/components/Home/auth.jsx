import React from "react";
export default ({openModal}) => {
    return <div className="home-start">
        <div>Пожалуйста <span style={{cursor: "pointer", color: "blueviolet"}} onClick={() => openModal(true)}>войдите</span>,</div>
        <div>чтобы получить доступ к своим постам</div>
    </div>
}