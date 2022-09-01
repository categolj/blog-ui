import Router from "next/router";

export default function NextButton({data, currentPage, size}) {
    const hasNext = data && data.length > size;
    const hasPrev = currentPage !== 0;
    const nextUrl = `?page=${currentPage + 1}&size=${size}`;
    const prevUrl = `?page=${currentPage - 1}&size=${size}`;
    const go = (evt, url) => {
        evt.preventDefault();
        Router.push(url);
    }
    return <p>
        {hasPrev && <a href={prevUrl} onClick={evt => go(evt, prevUrl)}>◀️ Prev️</a>}
        &nbsp;&nbsp;
        {hasNext && <a href={nextUrl} onClick={evt => go(evt, nextUrl)}>Next ▶️</a>}</p>;
}