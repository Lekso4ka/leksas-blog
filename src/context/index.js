import {createContext} from "react";

export const Ctx = createContext({
    userId: "",
    userToken: "",
    posts: [],
    searchText: "",
    favorites: [],
    api: {},
    modalActive: false,
    popupActive: false,
    setUser: () => {},
    setToken: () => {},
    setPosts: () => {},
    setSearchText: () => {},
    setFavorites: () => {},
    setModalActive: () => {},
    setPopupActive: () => {},
    search: (posts = this.posts, text = this.searchText) => {
        return posts.filter(p => p.title.toLowerCase().includes(text.toLowerCase()));
    }
});