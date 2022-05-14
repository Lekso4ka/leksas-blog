import React, {useState, useContext, } from "react";
import {Ctx} from "../../context";
import "./modal.css";

export default ({type}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, changeType] = useState(type === "auth");
    const {modalActive, setModalActive, api, setToken, setUser} = useContext(Ctx);
    const closeModal = () => {
        setModalActive(false);
        setEmail("");
        setPassword("");
    }
    const formHandler = e => {
        e.preventDefault();
        let res;
        if (auth) {
            res = api.authUser({email: email, password: password})
        } else {
            res = api.registerUser({email: email, password: password})
        }
        res
            .then(r => r.json())
            .then(ans => {
                console.log(ans)
                if (ans.message) {
                    alert(ans.message)
                } else {
                    if (!auth) {
                        api.authUser({email: email, password: password})
                            .then(r => r.json())
                            .then(data => {
                                setToken(data.token);
                                setUser(data.data._id);
                                localStorage.setItem("token", data.token);
                                localStorage.setItem("user", data.data._id);
                            })
                    } else {
                        setToken(ans.token);
                        setUser(ans.data._id);
                        localStorage.setItem("token", ans.token);
                        localStorage.setItem("user", ans.data._id);
                    }
                    setEmail("");
                    setPassword("");
                    setModalActive(false);
                }
            });
    }
    return <div className={"modal-container" + (modalActive && " active" || "")}>
        <div>
        <h2>{auth ? "Войти" : "Зарегистрироваться"}</h2>
        <form onSubmit={formHandler}>
            <input placeholder="Email" type="text" name="email" value={email} onInput={e => setEmail(e.target.value)}/>
            <input placeholder="Пароль" type="password" name="password" value={password} onInput={e => setPassword(e.target.value)}/>
            <button type="submit" className="modal-container__btn">
                {auth ? "Войти" : "Зарегистрироваться"}
            </button>
            <button type="button" className="modal-container__link" onClick={() => changeType(!auth)}>
                {auth ? "Зарегистрироваться" : "Войти"}
            </button>
        </form>
        <i className="bi bi-x-circle modal-container__close" onClick={closeModal}/>
        </div>
    </div>
}