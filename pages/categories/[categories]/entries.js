import useSWR from 'swr'

import {useRouter} from "next/router";
import {fetchEntries} from "../../../utils/fetcherHttp";
import {ListEntries} from "../../entries";
import Category from "../../../components/category";
import Loading from "../../../components/loading";
import Head from "next/head";
import {NextSeo} from "next-seo";
import NextButton from "../../../components/next-button";

export default function EntriesByCategory() {
    const router = useRouter();
    const categoriesQuery = router.query.categories;
    const categories = categoriesQuery && categoriesQuery.split(',');
    let {query, page, size, tag} = router.query;
    page = Number(page || 0);
    size = Number(size || 30);
    const params = {categories, size: size, page: page};
    if (query) {
        params.query = query;
    }
    const {
        data, error
    } = useSWR(params, fetchEntries);
    return <div>
        <NextSeo title={`Entries (Category: ${categories && categories.join('/')})`}
                 canonical={`https://ik.am/categories/${categoriesQuery}/entries`}
                 openGraph={{
                     url: `https://ik.am/categories/${categoriesQuery}/entries`
                 }}/>
        <Head>
            <title>Entries (Category: {categories && categories.join('/')}) -
                IK.AM</title>
        </Head>
        <h2>Entries (Category: <Category category={categories}/>)</h2>
        {(data && data.length > 0) ? <ListEntries entries={data} size={size}/> : <Loading/>}
        <NextButton data={data} params={params}/>
    </div>;

}