import Link from 'next/link';
import useSWRInfinite from 'swr/infinite'
import {isPC} from "../../utils/userAgents";
import {fetchEntries} from "../../utils/fetcherHttp";
import Loading from "../../components/loading";
import LoadMore from "../../components/loadmore-button";
import {useRouter} from "next/router";
import Head from "next/head";
import {NextSeo} from 'next-seo'

export default function Entries({entries}) {
    const router = useRouter();
    let {query, limit} = router.query;
    limit = limit || 30;
    const getKey = (pageIndex, previousPageData) => {
        if (previousPageData && !previousPageData.length) return null;
        const params = {page: pageIndex, size: limit};
        if (query) {
            params.query = query;
        }
        return params;
    }
    const {data, size, setSize} = useSWRInfinite(getKey, fetchEntries)
    entries = entries || (data && [].concat(...data));
    return (<div>
        <NextSeo title='Entries'
                 canonical='https://ik.am/entries'
                 openGraph={{
                     url: 'https://ik.am/entries'
                 }}/>
        <Head>
            <title>Entries - IK.AM</title>
        </Head>
        <h2>Entries</h2>
        <ListEntries entries={entries}/>
        <LoadMore data={data} limit={limit} size={size} setSize={setSize}/>
    </div>);
}

export function ListEntries({entries, size, lang}) {
    return (entries ? <ul className="list-disc list-inside">
        {entries.slice(0, size).map((entry) => {
            return <li key={entry.entryId}>
                <Link
                    href={`/entries/${entry.entryId}${lang ? `/${lang}` : ''}`}>{entry.frontMatter.title}</Link>
                &nbsp;{entryDate(entry)}
            </li>;
        })}
    </ul> : <Loading/>);
}

export async function getServerSideProps({req, query}) {
    const params = {size: 30};
    if (query.query) {
        params.query = query.query;
    }
    const entries = isPC(req.headers) ? null : await fetchEntries(params);
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