import {useEffect, useState} from 'react'
import Head from "next/head";
import {useRouter} from "next/router";
import urlProvider from "../../../../../utils/urlProvider";
import Link from "next/link";
import {zipkinFetch as fetch} from "../../../../../utils/fetcherHttp";

export default function Activation() {
    const router = useRouter();
    const {readerId, activationLinkId} = router.query;
    const [message, setMessage] = useState(null);
    useEffect(() => {
        const activate = async () => {
            try {
                const response = await fetch(`${urlProvider.NOTE_API}/readers/${readerId}/activations/${activationLinkId}`, {
                    method: 'POST'
                });
                if (response.status === 404) {
                    setMessage({
                        status: 'error',
                        text: '存在しないアクティベーションリンクです'
                    });
                    return;
                }
                setMessage({
                    status: 'success',
                    text: <span>アカウントがアクティベートされました。<Link
                        href={`/notes`}>こちら</Link>からログインしてください。</span>
                });
            } catch (e) {
                setMessage({
                    status: 'error',
                    text: 'Activation failed!'
                });
            }
        };
        if (readerId && activationLinkId) {
            activate().then();
        }
    }, [readerId, activationLinkId]);
    return <>
        <Head>
            <title>Activation - IK.AM</title>
        </Head>
        <h2>Activation</h2>
        {message &&
            <p className={`message-${message.status}`}>
                <strong>{message.status}</strong>: {message.text}
            </p>}
    </>;
}