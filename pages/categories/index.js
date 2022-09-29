import Category from "../../components/category";
import {fetchCategories} from "../../utils/fetcherHttp";
import Loading from "../../components/loading";
import useSWR from "swr";
import Head from "next/head";
import {NextSeo} from "next-seo";

export default function Categories({}) {
    const {data, error} = useSWR('/categories', fetchCategories);
    return <div>
        <NextSeo title='Categories'
                 canonical='https://ik.am/categories'
                 openGraph={{
                     url: 'https://ik.am/categories'
                 }}/>
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