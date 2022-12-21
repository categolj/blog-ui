import urlProvider from "../../utils/urlProvider";
import {useState} from "react";
import Head from "next/head";
import Link from "next/link";
import {zipkinFetch as fetch} from "../../utils/fetcherHttp";

export default function PasswordReset() {
    const [message, setMessage] = useState(null);
    const [freeze, setFreeze] = useState(false);
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            email: event.target.email.value,
            rawPassword: event.target.password.value,
        };
        for (const field of ['email', 'password', 'confirmPassword']) {
            if (!event.target[field].value) {
                setMessage({
                    status: 'error',
                    text: `"${field}" is missing`,
                });
                return;
            }
        }
        if (event.target.password.value !== event.target.confirmPassword.value) {
            setMessage({
                status: 'error',
                text: `"password" and "confirmPassword" must be same`,
            });
            return;
        }
        if (event.target.password.value.length < 8) {
            setMessage({
                status: 'error',
                text: `"password" must be greater than or equal to 8.`,
            });
            return;
        }
        try {
            const response = await fetch(`${urlProvider.NOTE_API}/readers`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (result.error) {
                setMessage({
                    status: 'error',
                    text: result.message
                });
                return;
            }
            setMessage({
                status: 'success',
                text: <span>
                    入力されたメールアドレスに確認メールを送りました。メールに記載されたリンクをクリックして下さい。<br/>
                <code
                    className={"bg-lime-400 dark:bg-lime-500"}>noreply@ik.am</code>から<code
                    className={"bg-lime-400 dark:bg-lime-500"}>【はじめるSpring Boot 3】アカウントアクティベーションリンク通知</code>という件名のメールです。<br/>
                受信までに時間がかかる場合があります。届いていない場合は、お手数ですが迷惑メールボックスを確認して下さい。<br/>
                アクティベーション完了後は、<Link href={`/note/login`}>こちら</Link>からログインしてください。</span>
            });
        } catch (e) {
            setMessage({
                status: 'error',
                text: 'Sign up failed!'
            });
        }
    };
    return <>
        <Head>
            <title>Sign up - IK.AM</title>
        </Head>
        <h2>Sign up</h2>
        {message &&
            <p className={`message-${message.status}`}>
                <strong>{message.status}</strong>: {message.text}
            </p>}
        <p>
            &quot;はじめるSpring Boot 3&quot;を読むには、<a
            href={'https://note.com/makingx/m/m2dc6f318899c'}>note.com</a>でノートまたはマガジン購入した上で、note.comとは別に当システムにアカウントを作成する必要があります。<br/>
            Emailアドレスとパスワードを設定してアカウントを作成して下さい。<br/>
            登録後に確認メールが送信されます。メールに記載されているアクティベーションリンクをクリックしてください。<br/>
            アクティベーション後は<Link href={`/note/login`}>こちら</Link>からログインしてください。
        </p>
        <form className="px-2 pt-2 pb-2 mb-2" onSubmit={async event => {
            setFreeze(true);
            await handleSubmit(event);
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
            <div className="mb-2">
                <label className="block text-sm font-bold mb-2"
                       htmlFor="password">
                    Password
                </label>
                <input
                    disabled={freeze}
                    className="text-slate-800 text-sm w-1/2 border rounded py-2 px-3 leading-tight"
                    id="password" type="password" placeholder="New password"/>
                <input
                    disabled={freeze}
                    className="text-slate-800 text-sm w-1/2 border rounded py-2 px-3 leading-tight"
                    id="confirmPassword" type="password"
                    placeholder="Re-enter new password"/>
            </div>
            <div className="flex items-center justify-between">
                <button
                    disabled={freeze}
                    className="text-sm font-bold py-2 px-4 border rounded"
                    type="submit">
                    Sign up
                </button>
            </div>
        </form>
    </>;
}