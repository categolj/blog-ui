import {useState} from 'react';
import Router from 'next/router'

export default function SearchBox({name}) {
    const [query, setQuery] = useState(null);
    const [search, setSearch] = useState(null);
    if (search) {
        setSearch(null);
        Router.push(`/entries?${search}`);
        return <></>;
    }
    const changeQuery = event => setQuery(event.target.value);
    const submit = event => {
        event.preventDefault();
        const params = new URLSearchParams();
        params.set('query', query);
        setSearch(params.toString());
    };
    return (
        <form onSubmit={submit}>
            <label>
                <input name="query" type="search"
                       className="text-slate-800 text-sm px-4 py-1 my-1 rounded-md"
                       placeholder="Search..."
                       onChange={changeQuery}/>
            </label>
        </form>
    );
}