import '../styles/globals.css';
import Layout from '../components/layout';
import {ThemeProvider} from 'next-themes'
import {DefaultSeo} from 'next-seo';

export default function MyApp({Component, pageProps}) {
    return (
        <ThemeProvider attribute="class" defaultTheme="light">
            <Layout>
                <DefaultSeo
                    defaultTitle='IK.AM'
                    titleTemplate='%s - IK.AM'
                    canonical='https://ik.am'
                    description="@making's tech note"
                    openGraph={{
                        type: 'website',
                        locale: 'ja_JP',
                        site_name: 'IK.AM',
                    }}
                    twitter={{
                        handle: '@making',
                        site: '@making',
                        cardType: 'summary',
                    }}
                />
                <Component {...pageProps} />
            </Layout>
        </ThemeProvider>
    );
}