import {isPC} from "../../../utils/userAgents";
import {fetchEntries} from "../../../utils/fetcherHttp";
import {useRouter} from "next/router";
import Head from "next/head";
import {NextSeo} from 'next-seo'
import {getCursorKey, ListEntries} from "../index";
import useSWRInfinite from "swr/infinite";
import LoadMore from "../../../components/loadmore-button";

export default function Entries({entries}) {
    const router = useRouter();
    let {query, limit} = router.query;
    limit = limit || 30;
    const getKey = getCursorKey({query, limit}, {});
    const {data, size, setSize} = useSWRInfinite(getKey, x => fetchEntries(x, 'en'), {
        revalidateFirstPage: false
    });
    entries = entries || (data && [].concat(...data));
    return (<div>
        <NextSeo title='Entries(en)'
                 canonical='https://ik.am/entries/en'
                 openGraph={{
                     url: 'https://ik.am/entries/en'
                 }}/>
        <Head>
            <title>Entries(en) - IK.AM</title>
        </Head>
        <h2>Entries(en)</h2>
        <ListEntries entries={entries} lang={'en'}/>
        <LoadMore data={data} limit={limit} size={size} setSize={setSize}/>
    </div>);
}

export async function getServerSideProps({req, query}) {
    const params = {size: 30};
    if (query.query) {
        params.query = query.query;
    }
    const entries = isPC(req.headers) ? null : await fetchEntries(params, 'en');
    return {props: {entries: entries}};
}