import useSWR from 'swr'
import {tagsFetcherRSocket} from "../../utils/fetcher";
import Tag from "../../components/tag";
import Loading from "../../components/loading";

export default function Tags({}) {
    const {data, error} = useSWR('/tag', tagsFetcherRSocket);
    return <div>
        <h2>Tags</h2>
        {data ?
            <ul>{data.map(tag => <li key={tag.name}><Tag name={tag.name}/></li>)}</ul>
            : <Loading/>}
    </div>;
}