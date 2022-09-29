import useSWR from 'swr'
import {tagsFetcherHttp} from "../../utils/fetcher";
import Tag from "../../components/tag";
import Loading from "../../components/loading";
import Head from "next/head";
import {NextSeo} from "next-seo";

export default function Tags({}) {
    const {data, error} = useSWR('/tag', tagsFetcherHttp);
    return <div>
        <NextSeo title='Tags'
                 canonical='https://ik.am/tags'
                 openGraph={{
                     url: 'https://ik.am/tags'
                 }}/>
        <Head>
            <title>Tags - IK.AM</title>
        </Head>
        <h2>Tags</h2>
        {data ?
            <ul>{data.map(tag => <li key={tag.name}><Tag name={tag.name}/></li>)}</ul>
            : <Loading/>}
    </div>;
}