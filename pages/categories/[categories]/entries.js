import {useRouter} from "next/router";
import {fetchEntries} from "../../../utils/fetcherHttp";
import {getCursorKey, ListEntries} from "../../entries";
import Category from "../../../components/category";
import Head from "next/head";
import {NextSeo} from "next-seo";
import useSWRInfinite from "swr/infinite";
import LoadMore from "../../../components/loadmore-button";

export default function EntriesByCategory() {
    const router = useRouter();
    const categoriesQuery = router.query.categories;
    const categories = categoriesQuery && categoriesQuery.split(',');
    let {query, limit} = router.query;
    limit = limit || 30;
    const getKey = getCursorKey({query, limit}, {categories});
    const {data, size, setSize} = useSWRInfinite(getKey, fetchEntries, {
        revalidateFirstPage: false
    });
    const entries = (data && [].concat(...data));
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
        <ListEntries entries={entries}/>
        <LoadMore data={data} limit={limit} size={size} setSize={setSize}/>
    </div>;

}