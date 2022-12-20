import Router from "next/router";

const appendQuery = (url, query) => {
    if (query) {
        return `${url}&query=${query}`
    }
    return url;
}

export default function NextButton({data, params}) {
    const size = params.size - 1;
    const currentPage = params.page;
    const hasNext = data && data.length > size;
    const hasPrev = currentPage !== 0;
    const nextUrl = appendQuery(`?page=${currentPage + 1}&size=${size}`, params.query);
    const prevUrl = appendQuery(`?page=${currentPage - 1}&size=${size}`, params.query);
    const go = (evt, url) => {
        evt.preventDefault();
        Router.push(url);
    }
    return <p>
        {hasPrev && <a href={prevUrl} onClick={evt => go(evt, prevUrl)}>◀️ Prev️</a>}
        &nbsp;&nbsp;
        {hasNext && <a href={nextUrl} onClick={evt => go(evt, nextUrl)}>Next ▶️</a>}</p>;
}