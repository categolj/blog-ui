import useSWR from 'swr'

import {useRouter} from "next/router";
import {entriesFetcherHttp} from "../../../utils/fetcher";
import {ListEntries} from "../../entries";
import Category from "../../../components/category";
import Loading from "../../../components/loading";
import Head from "next/head";
import {NextSeo} from "next-seo";

export default function EntriesByCategory() {
    const router = useRouter();
    const categoriesQuery = router.query.categories;
    const categories = categoriesQuery && categoriesQuery.split(',');
    const {
        data,
        error
    } = useSWR({categories, size: 30}, entriesFetcherHttp);
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
        {(data && data.length > 0) ? <ListEntries entries={data}/> :
            <Loading/>
        }
    </div>;

}