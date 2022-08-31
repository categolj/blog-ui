import RSS from 'rss';
import {entriesFetcherHttp} from "../utils/fetcher";

export async function generateFeedXml() {
    const feed = new RSS({
        title: "IK.AM",
        description: "@making's tech note",
        site_url: "https://ik.am",
        feed_url: "https://ik.am/feed",
        language: 'ja',
    });
    const entries = await entriesFetcherHttp({size: 20});
    entries.forEach((entry) => {
        feed.item({
            title: entry.frontMatter.title,
            date: new Date(entry.created.date),
            url: `https://ik.am/entries/${entry.entryId}`,
        });
    })
    return feed.xml({indent: true});
}