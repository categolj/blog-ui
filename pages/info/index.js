import Head from "next/head";
import {fetchInfo} from "../../utils/fetcherHttp";
import useSWR from "swr";

export default function Index() {
    const {data: info, error: errorInfo} = useSWR('/info', fetchInfo);

    return <>
        <Head>
            <title>Info - IK.AM</title>
        </Head>
        <h2>Info</h2>
        <h3>Blog API</h3>
        <pre><code>{JSON.stringify(info, '\t', 1)}</code></pre>
    </>;
}
