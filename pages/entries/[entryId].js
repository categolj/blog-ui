import Link from 'next/link';
import {entryDate, formatId, isIgnoreUpdateDate} from "./index";
import Tag from "../../components/tag";
import Category from "../../components/category";
import {isPC} from "../../utils/userAgents";
import useSWR from "swr";
import marked from "../../utils/marked";
import {fetchEntry} from "../../utils/fetcherHttp";
import Loading from "../../components/loading";
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
    const {data, error} = useSWR(entryId, fetchEntry);
    entry = entry || data;
    if (!entry || !entry.frontMatter) {
        return <Loading/>;
    }
    const category = entry.frontMatter.categories.map(x => x.name);
    const tags = entry.frontMatter.tags.map(x => <span key={x.name}><Tag
        name={x.name}/>&nbsp;</span>);
    const translationUrl = `https://github-com.translate.goog/making/blog.ik.am/blob/master/content/${formatId(entryId)}.md?_x_tr_sl=ja&_x_tr_tl=en&_x_tr_hl=ja&_x_tr_pto=wapp`;
    console.log(entry.frontMatter.tags)
    if (entry.frontMatter.tags.map(x => x.name).includes('Tanzu')) {
        console.log('Tanzu!');
    }
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
                href={`https://github.com/making/blog.ik.am/delete/master/content/${formatId(entryId)}.md`}>Delete</a>{`}`}&nbsp;
                🌎&nbsp;<a href={translationUrl}>Translation by Google</a>
            </span>
        </div>
        <hr/>
        {entry.frontMatter.tags.map(x => x.name).includes('Tanzu') &&
            <p className={'warning'}>
                ️{`⚠️`} 本記事の内容はVMwareによって<strong>サポートされていません</strong>。
                記事の内容で生じた問題については自己責任で対応し、 VMwareサポート窓口には<strong>問い合わせないでください</strong>。
            </p>}
        <article
            dangerouslySetInnerHTML={{__html: entry.content && marked.render(entry.content)}}/>
        <hr/>
        <TwitterShareButton url={`https://ik.am/entries/${entryId}`}
                            title={`${entry.frontMatter.title}`}>
            <TwitterIcon size={32} round={true}/>
        </TwitterShareButton>&nbsp;
        <FacebookShareButton url={`https://ik.am/entries/${entryId}`}
                             title={`${entry.frontMatter.title}`}>
            <FacebookIcon size={32} round={true}/>
        </FacebookShareButton>&nbsp;
        <LineShareButton url={`https://ik.am/entries/${entryId}`}
                         title={`${entry.frontMatter.title}`}>
            <LineIcon size={32} round={true}/>
        </LineShareButton>&nbsp;
        <ScrollToTop smooth style={{'padding-left': '5px'}}/>
    </div>;
}

export async function getServerSideProps({req, params}) {
    const entryId = params.entryId;
    const entry = isPC(req.headers) ? null : await fetchEntry(entryId);
    if (entry && entry.status === 404) {
        return {
            notFound: true,
        };
    }
    return {props: {entryId, entry}};
}