import Link from 'next/link';
import useSWR from 'swr';
import {isPC} from "../../utils/userAgents";
import {entriesFetcherHttp, entriesFetcherRSocket} from "../../utils/fetcher";
import Loading from "../../components/loading";
import {useRouter} from "next/router";
import Head from "next/head";

export default function Entries({entries}) {
    const router = useRouter();
    const {query} = router.query;
    const params = {size: 50};
    if (query) {
        params.query = query;
    }
    const {data, error} = useSWR(params, entriesFetcherRSocket);
    entries = entries || data;
    return (
        <div>
            <Head>
                <title>Entries - IK.AM</title>
            </Head>
            <h2>Entries</h2>
            <ListEntries entries={entries}/>
        </div>
    );
}

export function ListEntries({entries}) {
    return (entries ?
        <ul className="list-disc list-inside">
            {entries.map((entry) => {
                return <li key={entry.entryId}>
                    <Link
                        href={`/entries/${entry.entryId}`}><a>{entry.frontMatter.title}</a></Link>
                    &nbsp;{entryDate(entry)}
                </li>;
            })}
        </ul>
        : <Loading/>);
}

export async function getServerSideProps({req, query}) {
    const params = {size: 30};
    if (query.query) {
        params.query = query.query;
    }
    const entries = isPC(req.headers) ? null : await entriesFetcherHttp(params);
    return {props: {entries: entries}};
}

export const isIgnoreUpdateDate = (entry) => {
    return new Date(entry.updated.date).getTime() === 0;
};
export const entryDate = (entry) => {
    if (isIgnoreUpdateDate(entry)) {
        return <span>🗓 <span>Created at </span>{entry.created.date}</span>;
    } else {
        return <span>🗓 <span>Updated at </span>{entry.updated.date}</span>;
    }
}
export const formatId = id => ("0000" + id).substr(-5);