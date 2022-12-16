import Link from 'next/link';
import {entryDate, formatId, isIgnoreUpdateDate} from "../index";
import Tag from "../../../components/tag";
import Category from "../../../components/category";
import {isPC} from "../../../utils/userAgents";
import useSWR from "swr";
import marked from "../../../utils/marked";
import {fetchEntry} from "../../../utils/fetcherHttp";
import Loading from "../../../components/loading";
import Head from "next/head";
import ScrollToTop from "react-scroll-to-top";
import {NextSeo} from "next-seo";
import {
    FacebookIcon,
    FacebookShareButton,
    LineIcon,
    LineShareButton,
    TwitterIcon,
    TwitterShareButton
} from "react-share";

export default function Entry({entryId, entry}) {
    const {data, error} = useSWR(entryId, (entryId) => fetchEntry(entryId, 'en'));
    entry = entry || data;
    if (!entry) {
        return <Loading/>;
    }
    if (entry.status) {
        if (entry.status === 404) {
            const url = `https://github-com.translate.goog/making/blog.ik.am/blob/master/content/${formatId(entryId)}.md?_x_tr_sl=ja&_x_tr_tl=en&_x_tr_hl=ja&_x_tr_pto=wapp`;
            return (
                <div>
                    <article>
                        🙇‍ Sorry, this entry is not yet translated.<br/><br/>
                        Please use Google Translate bellow:<br/><br/>
                        🌎 <a href={url}>{url}</a>
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
    const category = entry.frontMatter.categories.map(x => x.name);
    const tags = entry.frontMatter.tags.map(x => <span key={x.name}><Tag
        name={x.name}/>&nbsp;</span>);
    return <div>
        <NextSeo title={entry.frontMatter.title}
                 canonical={`https://ik.am/entries/${entryId}/en`}
                 description={entry.content.substring(0, 200) + '...'}
                 openGraph={{
                     url: `https://ik.am/entries/${entryId}/en`
                 }}/>
        <Head>
            <title>{entry.frontMatter.title} - IK.AM</title>
        </Head>
        <h2><Link href={`/entries/${entryId}/en`}><a>{entry.frontMatter.title}</a></Link>
        </h2>
        <div className="text-sm">
            <Category category={category}/>
            <br/>
            {tags}
            {tags.length > 0 && <br/>}
            {entryDate(entry)}&nbsp;&nbsp;
            {!isIgnoreUpdateDate(entry) &&
                <span>🗓 Created at {entry.created.date}</span>}&nbsp;
            <span>
                {`{`}✒️️&nbsp;<a
                href={`https://github.com/making/ik.am_en/edit/master/content/${formatId(entryId)}.md`}>Edit</a>&nbsp;
                ⏰&nbsp;<a
                href={`https://github.com/making/ik.am_en/commits/master/content/${formatId(entryId)}.md`}>History</a>&nbsp;
                🗑&nbsp;<a
                href={`https://github.com/making/ik.am_en/delete/master/content/${formatId(entryId)}.md`}>Delete</a>{`}`}&nbsp;
                🇯🇵&nbsp;<a href={`/entries/${entryId}`}>Original entry</a>
            </span>
        </div>
        <hr/>
        {entry.frontMatter.tags.map(x => x.name).includes('Tanzu') &&
            <p className={'warning'}>
                ️{`⚠️`} The content of this article is <strong>not supported</strong> by
                VMware. Any issues arising from the content of this article are your
                responsibility and please <strong>do not contact</strong> VMware Support.
            </p>}
        <article
            dangerouslySetInnerHTML={{__html: entry.content && marked.render(entry.content)}}/>
        <hr/>
        <TwitterShareButton url={`https://ik.am/entries/${entryId}/en`}
                            title={`${entry.frontMatter.title}`}>
            <TwitterIcon size={32} round={true}/>
        </TwitterShareButton>&nbsp;
        <FacebookShareButton url={`https://ik.am/entries/${entryId}/en`}
                             title={`${entry.frontMatter.title}`}>
            <FacebookIcon size={32} round={true}/>
        </FacebookShareButton>&nbsp;
        <LineShareButton url={`https://ik.am/entries/${entryId}/en`}
                         title={`${entry.frontMatter.title}`}>
            <LineIcon size={32} round={true}/>
        </LineShareButton>&nbsp;
        <ScrollToTop smooth style={{paddingLeft: '5px'}}/>
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