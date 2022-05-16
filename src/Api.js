/*
    GET https://api.react-learning.ru/posts/search/?query=<строка фильтрации по title> // для поиска постов
    GET https://api.react-learning.ru/posts/paginate?page=<номер страницы>&limit=<число ограничивающее вывод на страницу>&query=<строка фильтрации по title> //добавление навигации
* */

export default class Api {
    constructor(token) {
        this.path = "https://api.react-learning.ru/";
        this.token = token;
    }
    registerUser(body) {
        return fetch(`${this.path}signup`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "authorization" : `Bearer ${this.token}`
            },
            body: JSON.stringify(body)
        })
    }
    authUser(body) {
        return fetch(`${this.path}signin`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "authorization" : `Bearer ${this.token}`
            },
            body: JSON.stringify(body)
        })
    }
    resetPassword(id, token) {
        return fetch(`${this.path}password-reset${id && token && `/${id}/${token}`}`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "authorization" : `Bearer ${this.token}`
            },
            body: JSON.stringify(body)
        })
    }
    getUsers() {
        return fetch(`${this.path}users`, {
            headers: {
                "authorization" : `Bearer ${this.token}`
            }
        })
    }
    getUser(id) {
        return fetch(`${this.path}users${id? `/${id}` : "/me"}`, {
            headers: {
                "authorization" : `Bearer ${this.token}`
            }
        })
    }
    updateUserData(body) {
        return fetch(`${this.path}users/me`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "authorization" : `Bearer ${this.token}`
            },
            body: JSON.stringify(body)
        })
    }
    updateUserImg(body) {
        return fetch(`${this.path}users/me/avatar`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "authorization" : `Bearer ${this.token}`
            },
            body: JSON.stringify(body)
        })
    }
    getPosts() {
        return fetch(`${this.path}posts`, {
            headers: {
                "authorization" : `Bearer ${this.token}`
            }
        })
    }
    getPost(id) {
        return fetch(`${this.path}posts/${id}`, {
            headers: {
                "authorization" : `Bearer ${this.token}`
            }
        })
    }
    deletePost(id) {
        return fetch(`${this.path}posts/${id}`, {
            method: "delete",
            headers: {
                "authorization" : `Bearer ${this.token}`
            }
        })
    }
    addPost(body) {
        return fetch(`${this.path}posts/`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "authorization" : `Bearer ${this.token}`
            },
            body: JSON.stringify(body)
        })
    }
    updatePost(id, body) {
        return fetch(`${this.path}posts/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "authorization" : `Bearer ${this.token}`
            },
            body: JSON.stringify(body)
        })
    }
    getComments() {
        return fetch(`${this.path}posts/comments/`, {
            headers: {
                "authorization" : `Bearer ${this.token}`
            }
        })
    }
    getCommentsByPost(id) {
        return fetch(`${this.path}posts/comments/${id}`, {
            headers: {
                "authorization" : `Bearer ${this.token}`
            }
        })
    }
    addComment(id, body) {
        return fetch(`${this.path}posts/comments/${id}`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "authorization" : `Bearer ${this.token}`
            },
            body: JSON.stringify(body)
        })
    }
    deleteComment(id, comment) {
        return fetch(`${this.path}posts/comments/${id}/${comment}`, {
            method: "delete",
            headers: {
                "authorization" : `Bearer ${this.token}`
            }
        })
    }
    setLike(id, isLike) {
        return fetch(`${this.path}posts/likes/${id}`, {
            method: isLike ? "delete" : "put",
            headers: {
                "authorization" : `Bearer ${this.token}`
            }
        })
    }
}
