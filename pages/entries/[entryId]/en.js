import {formatId} from "../index";
import EntryHeader from "../../../components/entry-header";
import EntryFooter from "../../../components/entry-footer";
import Loading from "../../../components/loading";
import {isPC} from "../../../utils/userAgents";
import marked from "../../../utils/marked";
import {fetchEntry} from "../../../utils/fetcherHttp";
import {addCopyButton} from "../../../utils/copy";
import useSWR from "swr";
import {useEffect} from "react";

export default function Entry({entryId, entry}) {
    const {data, error} = useSWR(entryId, (entryId) => fetchEntry(entryId, 'en'));
    entry = entry || data;
    useEffect(addCopyButton, [entry]);
    if (!entry) {
        return <Loading/>;
    }
    if (entry.status) {
        if (entry.status === 404) {
            const url = `https://ik-am.translate.goog/entries/${entryId}?_x_tr_sl=ja&_x_tr_tl=en&_x_tr_hl=en&_x_tr_pto=wapp&_x_tr_hist=true`;
            return (
                <div>
                    <article>
                        🙇‍ Sorry, this entry is not yet translated.<br/><br/>
                        Please use Google Translate below or <a href={`https://github.com/making/ik.am_en/issues/new?title=Translation%20Request%20to%20${entryId}&body=Please%20translate%20https://ik.am/entries/${entryId}%20into%20English`}>file an issue</a> requesting the translation:<br/><br/>
                        🌎 <a href={url}>{url}</a><br/>
                    </article>
                </div>
            )
        }
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
        <EntryHeader entry={entry} lang={'en'}/>
        <hr/>
        {entry.frontMatter.tags.map(x => x.name).includes('Tanzu') &&
            <p className={'message-warning'}>
                ️{`⚠️`} The content of this article is <strong>not supported</strong> by
                VMware. Any issues arising from the content of this article are your
                responsibility and please <strong>do not contact</strong> VMware Support.
            </p>}
        <article
            dangerouslySetInnerHTML={{__html: entry.content && marked.render(entry.content)}}/>
        <hr/>
        <EntryFooter entry={entry} lang={'en'}/>
    </div>;
}

export async function getServerSideProps({req, params}) {
    const entryId = params.entryId;
    const entry = isPC(req.headers) ? null : await fetchEntry(entryId, 'en');
    if (entry && entry.status === 404) {
        return {
            notFound: true,
        };
    }
    return {props: {entryId, entry}};
}