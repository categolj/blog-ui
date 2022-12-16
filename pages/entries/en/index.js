import useSWR from 'swr';
import {isPC} from "../../../utils/userAgents";
import {fetchEntries} from "../../../utils/fetcherHttp";
import {useRouter} from "next/router";
import Head from "next/head";
import NextButton from "../../../components/next-button";
import {NextSeo} from 'next-seo'
import {ListEntries} from "../index";

export default function Entries({entries}) {
    const router = useRouter();
    let {query, page, size} = router.query;
    page = Number(page || 0);
    size = Number(size || 50);
    const params = {size: size + 1, page: page};
    if (query) {
        params.query = query;
    }
    params.lang = 'en';
    const {data, error} = useSWR(params, params => fetchEntries(params, 'en'));
    entries = entries || data;
    return (
        <div>
            <NextSeo title='Entries (en)'
                     canonical='https://ik.am/entries/en'
                     openGraph={{
                         url: 'https://ik.am/entries/en'
                     }}/>
            <Head>
                <title>Entries (en) - IK.AM</title>
            </Head>
            <h2>Entries (en)</h2>
            <ListEntries entries={entries} size={size}/>
            <NextButton data={data} currentPage={page} size={size}/>
        </div>
    );
}

export async function getServerSideProps({req, query}) {
    const params = {size: 30};
    if (query.query) {
        params.query = query.query;
    }
    const entries = isPC(req.headers) ? null : await fetchEntries(params);
    return {props: {entries: entries}};
}