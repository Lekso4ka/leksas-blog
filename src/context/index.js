import {createContext} from "react";

export const Ctx = createContext({
    userId: "",
    userToken: "",
    posts: [],
    searchText: "",
    authors: [],
    tags: [],
    favorites: [],
    api: {},
    modalActive: false,
    popupActive: false,
    setUser: () => {},
    setToken: () => {},
    setPosts: () => {},
    setSearchText: () => {},
    setAuthors: () => {},
    setTags: () => {},
    setFavorites: () => {},
    setModalActive: () => {},
    setPopupActive: () => {},
    path: "/",
    search: (posts = this.posts, text = this.searchText) => {
        return posts.filter(p => p.title.toLowerCase().includes(text.toLowerCase()));
    }
});