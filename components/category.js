import Link from 'next/link';

export default function Category({category}) {
    if (!category) {
        return null;
    }
    const categories = [];
    const links = [<span key={'first'}>{`🗃 {`}</span>];
    category.forEach(c => {
        categories.push(c);
        const segment = categories.join(',');
        links.push(link(segment, categories));
        links.push(<span key={segment + '-slash'}>{`/`}</span>);
    });
    links.pop();
    links.push(<span key={'last'}>{`}`}</span>);
    return links;
}

function link(segment, categories) {
    const name = categories[categories.length - 1];
    return <Link key={segment} href={`/categories/${segment}/entries`}>{`${name}`}</Link>;
}