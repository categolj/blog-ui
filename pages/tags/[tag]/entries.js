import useSWR from 'swr'

import {useRouter} from "next/router";
import {ListEntries} from "../../entries";
import Loading from "../../../components/loading";
import {fetchEntries} from "../../../utils/fetcherHttp";
import Head from "next/head";
import {NextSeo} from "next-seo";

export default function EntriesByTag() {
    const router = useRouter();
    const {tag} = router.query;
    const {data, error} = useSWR({tag: tag, size: 30}, fetchEntries);
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
        {data ?
            <ListEntries entries={data}/>
            : <Loading/>}
    </div>;
}