import Link from 'next/link';

export default function Tag({name}) {
    return <Link href={`/tags/${name}/entries`}>{`🏷 ${name}`}</Link>;
}