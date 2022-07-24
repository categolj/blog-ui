import Category from "../../components/category";
import {categoriesFetcherRSocket} from "../../utils/fetcher";
import Loading from "../../components/loading";
import useSWR from "swr";
import Head from "next/head";

export default function Categories({}) {
    const {data, error} = useSWR('/categories', categoriesFetcherRSocket);
    return <div>
        <Head>
            <title>Categories - IK.AM</title>
        </Head>
        <h2>Categories</h2>
        {data ?
            <ul>{data.map(category => {
                const c = category.map(x => x.name);
                const key = c.join('-');
                return <li key={key}>
                    <Category category={c}/>
                </li>
            })}</ul> : <Loading/>}
    </div>;
}