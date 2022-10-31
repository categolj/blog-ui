import Head from "next/head";
import {fetchInfo} from "../../utils/fetcherHttp";
import useSWR from "swr";
import {JSONToHTMLTable} from "@kevincobain2000/json-to-html-table";

export default function Index() {
    const {data: info, error: errorInfo} = useSWR('/info', fetchInfo);
    return <>
        <Head>
            <title>Info - IK.AM</title>
        </Head>
        <h2>Info</h2>
        <h3>Blog API</h3>
        <JSONToHTMLTable data={info || []} tableClassName="info-table"/>
    </>;
}
