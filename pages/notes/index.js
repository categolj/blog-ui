import Head from "next/head";
import tokenHolder from "../../utils/tokenHolder";
import {useEffect, useState} from 'react'
import Link from "next/link";
import {zipkinFetch as fetch} from "../../utils/fetcherHttp";
import urlProvider from "../../utils/urlProvider";
import Loading from "../../components/loading";
import Login from "../note/login";
import dynamic from "next/dynamic";
import Jwt from "../../utils/jwt";

function Index() {
    const [notes, setNotes] = useState(null);
    const [message, setMessage] = useState(null);
    const token = tokenHolder.getToken();
    const loadNotes = () => {
        if (token) {
            fetch(`${urlProvider.NOTE_API}/notes`, {
                headers: {'Authorization': `Bearer ${token}`},
            }).then(res => {
                if (!res.ok) {
                    setMessage({
                        status: 'error',
                        text: 'Failed to retrieve notes'
                    });
                    return [];
                }
                return res.json();
            })
                .then(data => setNotes(data));
        }
    };
    useEffect(loadNotes, [token]);
    return (token ? <>
            <Head>
                <title>Notes - IK.AM</title>
            </Head>
            <h2>Notes</h2>
            {message &&
                <p className={`message-${message.status}`}>
                    <strong>{message.status}</strong>: {message.text}
                </p>}
            {!message && (notes ? <>

                    <p>
                        ようこそ {Jwt.decoded(token).preferred_username} さん。 <Link
                        href={'/note/logout'}>Logout</Link>
                    </p>
                    <h3>はじめるSpring Boot 3</h3>
                    <table>
                        <thead>
                        <tr>
                            <th>Title</th>
                            <th>Subscribed (*)</th>
                            <th>Updated Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            notes.map(note => <tr key={note.entryId}
                                                  className={!note.subscribed ? 'bg-neutral-100 dark:bg-neutral-700' : ''}>
                                <td>{note.title ? (note.subscribed ? <Link
                                    href={`/notes/${note.entryId}`}>{note.title}</Link> : note.title) : 'タイトル未定'}
                                </td>
                                <td>{note.subscribed ? `✅` : <>{`⛔️`} <a href={note.noteUrl}
                                                                         target={'_blank'}
                                                                         rel={'noopener noreferrer'}>購読化リンクの確認</a> (要購入)</>}</td>
                                <td>{note.updatedDate}</td>
                            </tr>)
                        }
                        </tbody>
                    </table>
                    <p className={"pt-2 pb-2"}>
                        {`(*) ... ✅の場合は記事が購読状態です。⛔の場合は購読状態になっていません。`}
                        note.comで記事を購入済みの場合は<a
                        href={`https://note.com/makingx/m/m2dc6f318899c`}>note.com</a>の該当ページから購読化リンクをクリックしてください。
                    </p>
                </> :
                <Loading/>)}
        </>
        : <Login/>);
}

export default dynamic(() => Promise.resolve(Index), {ssr: false});