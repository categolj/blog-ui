import Loading from "./loading";

export default function Presentations({items}) {
    return (items ?
        <ul className="list-disc list-inside">
            {items.map(s =>
                <li key={s.name}><a
                    href={s.href}>{s.name}</a> ({s.conference} / {s.date})</li>)}
        </ul> : <Loading/>);
}