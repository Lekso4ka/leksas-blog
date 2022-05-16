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
    const current = () => {
        const start = (page - 1) * count;
        const end = start + count;
        return data.slice(start, end);
    }
    return {page, maxPage, current, next, previous, jump}
}