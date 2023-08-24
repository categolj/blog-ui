import {useRouter} from "next/router";
import {getCursorKey, ListEntries} from "../../entries";
import {fetchEntries} from "../../../utils/fetcherHttp";
import Head from "next/head";
import {NextSeo} from "next-seo";
import useSWRInfinite from "swr/infinite";
import LoadMore from "../../../components/loadmore-button";

export default function EntriesByTag() {
    const router = useRouter();
    let {tag, query, limit} = router.query;
    limit = limit || 30;
    const getKey = getCursorKey({query, limit}, {tag});
    const {data, size, setSize} = useSWRInfinite(getKey, fetchEntries, {
        revalidateFirstPage: false
    });
    const entries = (data && [].concat(...data));
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
        <ListEntries entries={entries}/>
        <LoadMore data={data} limit={limit} size={size} setSize={setSize}/>
    </div>;
}