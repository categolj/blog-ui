import useSWR from 'swr'
import {fetchTags} from "../../utils/fetcherHttp";
import Tag from "../../components/tag";
import Loading from "../../components/loading";
import Head from "next/head";
import {NextSeo} from "next-seo";
import React, {useState} from 'react';


export default function Tags({}) {
    const {data, error} = useSWR('/tag', () => fetchTags());
    const [orderBy, setOrderBy] = useState('name');
    const buttonStyles = {'name': {}, 'count': {}};
    buttonStyles[orderBy].fontWeight = 'bold';
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
        sort by <button onClick={() => setOrderBy('name')}
                        style={buttonStyles.name}>name</button>&nbsp;
        <button onClick={() => setOrderBy('count')} style={buttonStyles.count}>count
        </button>
        {data ?
            <ul>{data
                .sort((a, b) => {
                    if (orderBy === 'name') {
                        return a[orderBy].localeCompare(b[orderBy]);
                    }
                    if (orderBy === 'count') {
                        return b[orderBy] - a[orderBy];
                    }
                })
                .map(tag => <li key={tag.name}><Tag name={tag.name}/> ({tag.count})
                </li>)}</ul>
            : <Loading/>}
    </div>;
}