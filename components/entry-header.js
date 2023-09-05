import Link from 'next/link';
import Category from "./category";
import {entryDate, isIgnoreUpdateDate} from "../pages/entries";
import Counter from "./counter";
import Tag from "./tag";
import entryLang from "./entry-lang";
import {NextSeo} from "next-seo";
import Head from "next/head";

export default function EntryHeader({entry, lang}) {
    const entryId = entry.entryId;
    const category = entry.frontMatter.categories.map(x => x.name);
    const tags = entry.frontMatter.tags.map(x => <span key={x.name}><Tag
        name={x.name}/>&nbsp;</span>);
    return <>
        <NextSeo title={entry.frontMatter.title}
                 canonical={`https://ik.am${entryLang[lang].entryPath(entryId)}`}
                 description={entry.content.substring(0, 200) + '...'}
                 openGraph={{
                     url: `https://ik.am${entryLang[lang].entryPath(entryId)}`
                 }}/>
        <Head>
            <title>{entry.frontMatter.title} - IK.AM</title>
        </Head>
        <h2><Link href={entryLang[lang].entryPath(entryId)}>{entry.frontMatter.title}</Link>
        </h2>
        <div className="text-sm">
            <Category category={category}/>
            <br/>
            {tags}
            {tags.length > 0 && <br/>}
            {entryDate(entry)}&nbsp;&nbsp;
            {!isIgnoreUpdateDate(entry) && <span>🗓 Created at {entry.created.date}</span>}&nbsp;
            <Counter entryId={entryId}/>
            &nbsp;
            {entryLang[lang].linkToAnotherLang(entryId)}
        </div>
    </>;
}