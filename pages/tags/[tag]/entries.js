import useSWR from 'swr'

import {useRouter} from "next/router";
import {ListEntries} from "../../entries";
import Loading from "../../../components/loading";
import {entriesFetcherRSocket} from "../../../utils/fetcher";
import Head from "next/head";

export default function EntriesByTag() {
    const router = useRouter();
    const {tag} = router.query;
    const {data, error} = useSWR({tag: tag, size: 30}, entriesFetcherRSocket);
    return <div>
        <Head>
            <title>Entries (Tag: {`🏷 ${tag}`}) - IK.AM</title>
        </Head>
        <h2>Entries (Tag: {`🏷 ${tag}`})</h2>
        {data ?
            <ListEntries entries={data}/>
            : <Loading/>}
    </div>;
}