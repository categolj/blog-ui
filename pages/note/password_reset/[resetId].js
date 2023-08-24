import urlProvider from "../../../utils/urlProvider";
import {useState} from "react";
import Head from "next/head";
import Link from "next/link";
import {useRouter} from "next/router";

export default function PasswordReset() {
    const router = useRouter();
    const {resetId} = router.query;
    const [message, setMessage] = useState(null);
    const [freeze, setFreeze] = useState(false);
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            newPassword: event.target.newPassword.value,
            resetId: resetId
        };
        for (const field of ['newPassword', 'confirmPassword']) {
            if (!event.target[field].value) {
                setMessage({
                    status: 'error',
                    text: `"${field}" is missing`,
                });
                return;
            }
        }
        if (event.target.newPassword.value !== event.target.confirmPassword.value) {
            setMessage({
                status: 'error',
                text: `"newPassword" and "confirmPassword" must be same`,
            });
            return;
        }
        try {
            const response = await fetch(`${urlProvider.NOTE_API}/password_reset`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data),
            });
            const status = response.status;
            if (status === 404) {
                setMessage({
                    status: 'error',
                    text: 'Invalid password reset link'
                });
                return;
            }
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
                text: <span>パスワードがリセットされました。<br/>
                    <code
                        className={"bg-lime-400 dark:bg-lime-500"}>noreply@sendgrid.net</code>から<code
                        className={"bg-lime-400 dark:bg-lime-500"}>【はじめるSpring
                        Boot
                        3】パスワードリセットリンク通知</code>という件名のメールです。<br/>
                    受信までに時間がかかる場合があります。届いていない場合は、お手数ですが迷惑メールボックスを確認して下さい。<br/>
                    <Link href={`/notes`}>こちら</Link>からログインしてください。</span>
            });
        } catch (e) {
            setMessage({
                status: 'error',
                text: 'Password Reset failed!'
            });
        }
    };
    return <>
        <Head>
            <title>Password Reset - IK.AM</title>
        </Head>
        <h2>Password Reset</h2>
        {message &&
            <p className={`message-${message.status}`}>
                <strong>{message.status}</strong>: {message.text}
            </p>}
        <form className="px-2 pt-2 pb-2 mb-2" onSubmit={async event => {
            setFreeze(true);
            await handleSubmit(event);
            setFreeze(false);
        }}>
            <div className="mb-2">
                <input
                    disabled={freeze}
                    className="text-slate-800 text-sm w-1/2 border rounded py-2 px-3 leading-tight"
                    id="newPassword" type="password" placeholder="New password"/>
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
                    Reset Password
                </button>
            </div>
        </form>
    </>;
}