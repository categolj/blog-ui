import useSWR from 'swr'
import {tagsFetcherRSocket} from "../../utils/fetcher";
import Tag from "../../components/tag";
import Loading from "../../components/loading";
import Head from "next/head";

export default function Tags({}) {
    const {data, error} = useSWR('/tag', tagsFetcherRSocket);
    return <div>
        <Head>
            <title>Tags - IK.AM</title>
        </Head>
        <h2>Tags</h2>
        {data ?
            <ul>{data.map(tag => <li key={tag.name}><Tag name={tag.name}/></li>)}</ul>
            : <Loading/>}
    </div>;
}