import {useEffect, useState} from 'react'
import Head from "next/head";
import {useRouter} from "next/router";
import urlProvider from "../../../utils/urlProvider";
import {zipkinFetch as fetch} from "../../../utils/fetcherHttp";
import tokenHolder from "../../../utils/tokenHolder";
import Link from "next/link";

export default function Subscribe() {
    const router = useRouter();
    const noteId = router.query.entryId; // You cannot use different slug names for the same dynamic path ('entryId' !== 'noteId')
    const [message, setMessage] = useState(null);

    const token = tokenHolder.getToken();
    const loadNote = async () => {
        if (token && noteId) {
            const response = await fetch(`${urlProvider.NOTE_API}/notes/${noteId}/subscribe`, {
                method: 'POST',
                headers: {'Authorization': `Bearer ${token}`},
            });
            if (response.status === 404) {
                setMessage({
                    status: 'error',
                    text: '存在しないNoteです'
                });
                return;
            }
            if (response.status === 403) {
                setMessage({
                    status: 'error',
                    text: 'まだアクセスできないNoteです'
                });
                return;
            }
            const data = await response.json();
            if (data.subscribed) {
                setMessage({
                    status: 'info',
                    text: <>既に購読状態になっています。<Link
                        href={`/notes/${data.entryId}`}>記事</Link>にアクセスしてください。</>
                });
            } else {
                setMessage({
                    status: 'success',
                    text: <>記事が購読状態になりました。<Link
                        href={`/notes/${data.entryId}`}>記事</Link>にアクセスしてください。</>
                });
            }
        }
    };
    useEffect((noteId, token) => {
        loadNote(noteId, token).then();
    }, [noteId, token]);
    return <>
        <Head>
            <title>Subscribe - IK.AM</title>
        </Head>
        <h2>Subscribe</h2>
        {message &&
            <p className={`message-${message.status}`}>
                <strong>{message.status}</strong>: {message.text}
            </p>}
    </>;
}