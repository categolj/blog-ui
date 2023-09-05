import EntryHeader from "../../components/entry-header";
import EntryFooter from "../../components/entry-footer";
import Loading from "../../components/loading";
import {isPC} from "../../utils/userAgents";
import useSWR from "swr";
import marked from "../../utils/marked";
import {fetchEntry} from "../../utils/fetcherHttp";
import {useEffect} from "react";
import {addCopyButton} from "../../utils/copy";

export default function Entry({entryId, entry}) {
    const {data, error} = useSWR(entryId, fetchEntry);
    entry = entry || data;
    useEffect(addCopyButton, [entry]);
    if (!entry) {
        return <Loading/>;
    }
    if (entry.status) {
        return <div>
            <h2>{entry.title}</h2>
            <pre><p>{JSON.stringify(entry, null, '  ')}</p></pre>
        </div>;
    }
    if (!entry.frontMatter) {
        return <div>
            <h2>{`❗️ Unexpected status`}</h2>
            <pre><p>{JSON.stringify(entry, null, '  ')}</p></pre>
        </div>;
    }
    return <div>
        <EntryHeader entry={entry} lang={'ja'}/>
        <hr/>
        {entry.frontMatter.tags.map(x => x.name).includes('Tanzu') && <p className={'message-warning'}>
            ️{`⚠️`} 本記事の内容はVMwareによって<strong>サポートされていません</strong>。
            記事の内容で生じた問題については自己責任で対応し、
            VMwareサポート窓口には<strong>問い合わせないでください</strong>。
        </p>}
        <article
            dangerouslySetInnerHTML={{__html: entry.content && marked.render(entry.content)}}/>
        <hr/>
        <EntryFooter entry={entry} lang={'ja'}/>
    </div>;
}

export async function getServerSideProps({req, params}) {
    const entryId = params.entryId;
    const entry = isPC(req.headers) ? null : await fetchEntry(entryId);
    if (entry && entry.status === 404) {
        return {
            notFound: true,
        };
    }
    return {props: {entryId, entry}};
}