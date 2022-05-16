import React, {useContext, useEffect, useState} from "react";
import {Ctx} from "../../context";
import "./pagination.css";

export default ({changePage, page, hook}) => {
    const [pagination, setPagination] = useState([]);
    useEffect(() => {
        if (hook.maxPage) {
            let arr = [];
            let start = Math.floor((page - 1) / 5) * 5;
            for (let i = start, cnt = Math.min(start + 5, hook.maxPage); i < cnt; i++) {
                arr.push(i + 1);
            }
            start && arr.unshift("begin");
            arr[arr.length - 1] !== hook.maxPage && arr.push("end");
            if (hook.maxPage >= 9) {
                if (!arr.includes("begin")) {
                    for (let i = hook.maxPage - (8 - arr.length); i < hook.maxPage; i++) {
                        arr.push(i);
                    }
                }
                if (!arr.includes("end")) {
                    for (let i = (9 - arr.length); i > 1; i--) {
                        arr.unshift(i);
                    }
                }
            }
            arr[0] !== 1 && arr.unshift(1);
            arr[arr.length - 1] !== hook.maxPage && arr.push(hook.maxPage);
            setPagination(arr);
        }
    }, [hook])
    return <div className="pagination">
        <div className="page" onClick={() => {
            changePage(1);
            hook.jump(1);
        }}>
            <i className="bi bi-skip-backward"/>
        </div>
        <div className="page" onClick={() => {
            changePage(Math.max(page - 1, 1));
            hook.previous();
        }}>
            <i className="bi bi-skip-start"/>
        </div>
        {pagination.map((p, i) => <div className={`page ${p === page ? "active" : ""}`} key={i} onClick={() => {
            if (p === "begin") {
                console.log("page prev", page);
                changePage(Math.floor((page - 1) / 5) * 5);
            } else if (p === "end") {
                console.log("page next", page);
                changePage(Math.ceil(page / 5) * 5 + 1);
            } else {
                changePage(p);
                hook.jump(p);
            }
        }}>{typeof p === "number" ? p : "..."}</div>)}
        <div className="page" onClick={() => {
            changePage(Math.min(page + 1, hook.maxPage));
            hook.next();
        }}>
            <i className="bi bi-skip-end"/>
        </div>
        <div className="page" onClick={() => {
            changePage(hook.maxPage);
            hook.jump(hook.maxPage);
        }}>
            <i className="bi bi-skip-forward"/>
        </div>
    </div>
}
