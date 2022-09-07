import Link from 'next/link';
import {entryDate, formatId, isIgnoreUpdateDate} from "./index";
import Tag from "../../components/tag";
import Category from "../../components/category";
import {isPC} from "../../utils/userAgents";
import useSWR from "swr";
import marked from "../../utils/marked";
import {entryFetcherHttp, entryFetcherRSocket} from "../../utils/fetcher";
import Loading from "../../components/loading";
import Head from "next/head";
import ScrollToTop from "react-scroll-to-top";
import {NextSeo} from "next-seo";

const pino = require('pino')()

export default function Entry({entryId, entry}) {
    const {data, error} = useSWR(entryId, entryFetcherRSocket);
    entry = entry || data;
    if (!entry || !entry.frontMatter) {
        return <Loading/>;
    }
    const category = entry.frontMatter.categories.map(x => x.name);
    const tags = entry.frontMatter.tags.map(x => <span key={x.name}><Tag
        name={x.name}/>&nbsp;</span>);
    return <div>
        <NextSeo title={entry.frontMatter.title}
                 canonical={`https://ik.am/entries/${entryId}`}
                 description={entry.content.substring(0, 200) + '...'}
                 openGraph={{
                     url: `https://ik.am/entries/${entryId}`
                 }}/>
        <Head>
            <title>{entry.frontMatter.title} - IK.AM</title>
        </Head>
        <h2><Link href={`/entries/${entryId}`}><a>{entry.frontMatter.title}</a></Link>
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
                href={`https://github.com/making/blog.ik.am/edit/master/content/${formatId(entryId)}.md`}>Edit</a>&nbsp;
                ⏰&nbsp;<a
                href={`https://github.com/making/blog.ik.am/commits/master/content/${formatId(entryId)}.md`}>History</a>&nbsp;
                🗑&nbsp;<a
                href={`https://github.com/making/blog.ik.am/delete/master/content/${formatId(entryId)}.md`}>Delete</a>{`}`}
            </span>
        </div>
        <hr/>
        <article
            dangerouslySetInnerHTML={{__html: entry.content && marked.render(entry.content)}}/>
        <ScrollToTop smooth style={{'padding-left': '5px'}}/>
    </div>;
}

export async function getServerSideProps({req, params}) {
    const entryId = params.entryId;
    pino.info(req);
    const entry = isPC(req.headers) ? null : await entryFetcherHttp(entryId);
    if (entry && entry.status === 404) {
        return {
            notFound: true,
        };
    }
    return {props: {entryId, entry}};
}