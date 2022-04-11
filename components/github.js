import Loading from "./loading";

export default function Github({items}) {
    return (items ? <ul className="list-disc list-inside">
        {items.map(item =>
            <li key={item.id}><a href={item.html_url}
                                 target="_blank"
                                 rel="noopener noreferrer">{item.full_name}</a>{item.description && ` (${item.description})`}
            </li>)}
    </ul> : <Loading/>);
}