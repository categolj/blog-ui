import useSWR from 'swr'

import {useRouter} from "next/router";
import {ListEntries} from "../../entries";
import Loading from "../../../components/loading";
import {fetchEntries} from "../../../utils/fetcherHttp";
import Head from "next/head";
import {NextSeo} from "next-seo";
import NextButton from "../../../components/next-button";

export default function EntriesByTag() {
    const router = useRouter();
    let {query, page, size, tag} = router.query;
    page = Number(page || 0);
    size = Number(size || 30);
    const params = {tag: tag, size: size, page: page};
    if (query) {
        params.query = query;
    }
    const {data, error} = useSWR(params, fetchEntries);
    return <div>
        <NextSeo title={`Entries (Tag: ${tag})`}
                 canonical={`https://ik.am/tags/${tag}/entries`}
                 openGraph={{
                     url: `https://ik.am/tags/${tag}/entries`
                 }}/>
        <Head>
            <title>Entries (Tag: {`🏷 ${tag}`}) - IK.AM</title>
        </Head>
        <h2>Entries (Tag: {`🏷 ${tag}`})</h2>
        {data ? <ListEntries entries={data} size={size}/> : <Loading/>}
        <NextButton data={data} params={params}/>
    </div>;
}