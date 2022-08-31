import {Head, Html, Main, NextScript} from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head>
                <link rel="alternate" type="application/rss+xml" title="IK.AM"
                      href="/feed"/>
            </Head>
            <body className="dark:bg-black">
            <Main/>
            <NextScript/>
            </body>
        </Html>
    )
}