import Link from 'next/link';
import {entryDate, isIgnoreUpdateDate} from "../entries/index";
import marked from "../../utils/marked";
import {zipkinFetch as fetch} from "../../utils/fetcherHttp";
import Loading from "../../components/loading";
import Head from "next/head";
import ScrollToTop from "react-scroll-to-top";
import tokenHolder from "../../utils/tokenHolder";
import urlProvider from "../../utils/urlProvider";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {addCopyButton} from "../../utils/copy";
import {parseWwwAuthenticate} from "./index";

export default function Note() {
    const router = useRouter();
    const [entry, setEntry] = useState(null);
    const [message, setMessage] = useState(null);
    const {entryId} = router.query;
    const token = tokenHolder.getToken();
    const loadNote = async () => {
        if (entryId && token) {
            const response = await fetch(`${urlProvider.NOTE_API}/notes/${entryId}`, {
                headers: {'Authorization': `Bearer ${token}`},
            });
            try {
                if (response.status === 401) {
                    const wwwAuthenticate = parseWwwAuthenticate(response.headers.get('www-authenticate'));
                    if (wwwAuthenticate.get('error') === '"invalid_token"' && wwwAuthenticate.get('error_description').indexOf('expired') > 0) {
                        setMessage({
                            status: 'warning',
                            text: <>Tokenの有効期限が切れました。<Link
                                href={`/note/login`}>こちら</Link>から再ログインしてください</>
                        });
                        return;
                    }
                }
                if (response.status === 404) {
                    setMessage({
                        status: 'error',
                        text: '存在しないNoteです'
                    });
                    return;
                }
                const data = await response.json();
                if (response.status === 403) {
                    setMessage({
                        status: 'error',
                        text: <>未購読のNoteです。
                            <a href={data.noteUrl}
                               target={'_blank'}
                               rel={'noopener noreferrer'}>購読化リンク</a>から購読してください。</>
                    });
                    return;
                }
                setEntry(data);
            } catch (e) {
                if (response.status === 403) {
                    setMessage({
                        status: 'error',
                        text: 'まだアクセスできないNoteです'
                    });
                    return;
                }
                console.error(e);
                setMessage({
                    status: 'error',
                    text: '想定外の例外です'
                });
            }
        }
    };
    useEffect(addCopyButton, [entry]);
    useEffect((entryId, token) => {
        loadNote(entryId, token).then();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [entryId, token]);
    if (message) {
        return <p className={`message-${message.status}`}>
            <strong>{message.status}</strong>: {message.text}
        </p>;
    }
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
        <Head>
            <title>{entry.frontMatter.title} - IK.AM</title>
        </Head>
        <h2><Link href={`/notes/${entryId}`}>{entry.frontMatter.title}</Link>
        </h2>
        <div className="text-sm">
            {entryDate(entry)}&nbsp;&nbsp;
            {!isIgnoreUpdateDate(entry) &&
                <span>🗓 Created at {entry.created.date}</span>}&nbsp;
        </div>
        <hr/>
        <article
            dangerouslySetInnerHTML={{__html: entry.content && marked.render(entry.content)}}/>
        <hr/>
        <ScrollToTop smooth style={{paddingLeft: '5px'}}/>
    </div>;
}