import React, {useState} from "react";
export default (data, count) => {
    const [page, setPage] = useState(1);
    const maxPage = Math.ceil(data.length / count);
    const next = () => {
        setPage(page => Math.min(page + 1, maxPage));
    }
    const previous = () => {
        setPage(page => Math.max(page - 1, 1));
    }
    const jump = (page) => {
        setPage(Math.min(Math.max(1, page), maxPage));
    }
    const current = (sort = "new") => {
        const start = (page - 1) * count;
        const end = start + count;
        data.sort((a, b) => {
            switch (sort) {
                case "new":
                    return new Date(b.created_at) - new Date(a.created_at)
                case "old":
                    return new Date(a.created_at) - new Date(b.created_at)
                case "like":
                    return (b.likes.length + b.comments.length) - (a.likes.length + a.comments.length)
            }
        });
        return data.slice(start, end);
    }
    return {page, maxPage, current, next, previous, jump}
}