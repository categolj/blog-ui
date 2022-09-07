import Link from 'next/link';
import useSWR from 'swr';
import {isPC} from "../../utils/userAgents";
import {entriesFetcherHttp, entriesFetcherRSocket} from "../../utils/fetcher";
import Loading from "../../components/loading";
import {useRouter} from "next/router";
import Head from "next/head";
import NextButton from "../../components/next-button";
import {NextSeo} from 'next-seo'

export default function Entries({entries}) {
    const router = useRouter();
    let {query, page, size} = router.query;
    page = Number(page || 0);
    size = Number(size || 50);
    const params = {size: size + 1, page: page};
    if (query) {
        params.query = query;
    }
    const {data, error} = useSWR(params, entriesFetcherRSocket);
    entries = entries || data;
    return (
        <div>
            <NextSeo title='Entries'
                     canonical='https://ik.am/entries'
                     openGraph={{
                         url: 'https://ik.am/entries'
                     }}/>
            <Head>
                <title>Entries - IK.AM</title>
            </Head>
            <h2>Entries</h2>
            <ListEntries entries={entries} size={size}/>
            <NextButton data={data} currentPage={page} size={size}/>
        </div>
    );
}

export function ListEntries({entries, size}) {
    return (entries ?
        <ul className="list-disc list-inside">
            {entries.slice(0, size).map((entry) => {
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