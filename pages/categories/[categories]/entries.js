import useSWR from 'swr'

import {useRouter} from "next/router";
import {entriesFetcherRSocket} from "../../../utils/fetcher";
import {ListEntries} from "../../entries";
import Category from "../../../components/category";
import Loading from "../../../components/loading";
import Head from "next/head";

export default function EntriesByCategory() {
    const router = useRouter();
    let {categories} = router.query;
    categories = categories && categories.split(',');
    const {
        data,
        error
    } = useSWR({categories, size: 30}, entriesFetcherRSocket);
    return <div>
        <Head>
            <title>Entries (Category: {categories && categories.join('/')}) -
                IK.AM</title>
        </Head>
        <h2>Entries (Category: <Category category={categories}/>)</h2>
        {(data && data.length > 0) ? <ListEntries entries={data}/> :
            <Loading/>
        }
    </div>;

}