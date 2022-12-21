import urlProvider from "../../utils/urlProvider";
import {useState} from "react";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import tokenHolder from "../../utils/tokenHolder";
import {zipkinFetch as fetch} from "../../utils/fetcherHttp";

export default function Login() {
    const [message, setMessage] = useState(null);
    const [freeze, setFreeze] = useState(false);

    const handleSubmitLogin = async (event) => {
        event.preventDefault();
        const data = {
            username: event.target.email.value,
            password: event.target.password.value,
        };
        for (const field of ['email', 'password']) {
            if (!event.target[field].value) {
                setMessage({
                    status: 'error',
                    text: `"${field}" is missing`,
                });
                return;
            }
        }
        try {
            const response = await fetch(`${urlProvider.NOTE_API}/oauth/token`, {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: new URLSearchParams(data),
            });
            const result = await response.json();
            if (result.error) {
                setMessage({
                    status: 'error',
                    text: result.error_description
                });
                return;
            }
            tokenHolder.setToken(result.access_token);
            Router.push(`/notes`);
        } catch (e) {
            setMessage({
                status: 'error',
                text: 'Login failed!'
            });
        }
    };

    const handleSubmitReset = async (event) => {
        event.preventDefault()
        const data = {
            email: event.target.email.value,
        };
        for (const field of ['email']) {
            if (!event.target[field].value) {
                setMessage({
                    status: 'error',
                    text: `"${field}" is missing`,
                });
                return;
            }
        }
        const endpoint = `${urlProvider.NOTE_API}/password_reset/send_link`
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        };
        try {
            const response = await fetch(endpoint, options);
            await response.json();
        } catch (ignored) {
        }
        setMessage({
            status: 'success',
            text: `パスワードリセットリンクを ${data.email} に送信しました。メールに記載されたリンクをクリックして下さい。`
        });
    };

    return <>
        <Head>
            <title>Login - IK.AM</title>
        </Head>
        <h2>Login</h2>
        {message &&
            <p className={`message-${message.status}`}>
                <strong>{message.status}</strong>: {message.text}
            </p>}
        <p>
            当システムに登録済みのEmailアドレスをパスワード入力し、ログインして下さい。<br/>
            <strong>note.comのアカウントではありません</strong>。&quot;はじめるSpring Boot3&quot;を読むには、<a
            href={'https://note.com/makingx/m/m2dc6f318899c'}>note.com</a>でノートまたはマガジン購入した上で、note.comとは別に当システムにアカウントを作成する必要があります。<br/>
            未登録の場合は<Link href={`/note/signup`}>こちら</Link>から登録してください。
        </p>
        <form className="px-2 pt-2 pb-2 mb-2" onSubmit={async event => {
            setFreeze(true);
            await handleSubmitLogin(event);
            setFreeze(false);
        }}>
            <div className="mb-2">
                <label className="block text-sm font-bold mb-2" htmlFor="email">
                    Email
                </label>
                <input
                    disabled={freeze}
                    className="text-slate-800 text-sm border rounded w-full py-2 px-3 leading-tight"
                    id="email" type="text" placeholder="Email"/>
            </div>
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2"
                       htmlFor="password">
                    Password
                </label>
                <input
                    disabled={freeze}
                    className="text-slate-800 text-sm border rounded w-full py-2 px-3 leading-tight"
                    id="password" type="password" placeholder="Password"/>
            </div>
            <div className="flex items-center justify-between">
                <button
                    disabled={freeze}
                    className="text-sm font-bold py-2 px-4 border rounded"
                    type="submit">
                    Login
                </button>
            </div>
        </form>
        <p>
            パスワードが未設定の場合、またはパスワードをリセットしたい場合は、以下より登録済みのメールアドレスを入力してください。パスワードリセット用のリンクを送信します。
        </p>
        <form className="px-2 pt-2 pb-2 mb-2" onSubmit={async event => {
            setFreeze(true);
            await handleSubmitReset(event);
            setFreeze(false);
        }}>
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="resetEmail">
                    Email
                </label>
                <input
                    disabled={freeze}
                    className="text-slate-800 text-sm border rounded w-full py-2 px-3 leading-tight"
                    name="email"
                    id="resetEmail" type="text" placeholder="Email"/>
            </div>
            <div className="flex items-center justify-between">
                <button
                    disabled={freeze}
                    className="text-sm font-bold py-2 px-4 border rounded"
                    type="submit">
                    Reset
                </button>
            </div>
        </form>
    </>;
}