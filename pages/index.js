import {ListEntries} from "./entries";
import {isPC} from "../utils/userAgents";
import useSWR from "swr";
import {fetchEntries} from "../utils/fetcherHttp";
import Github from "../components/github";
import Presentations from "../components/presentations";
import Head from "next/head";

const fetchGithub = () => fetch('https://api.github.com/search/repositories?q=user:making&sort=updated&order=desc')
    .then(data => data.json())
    .then(json => json.items.slice(0, 10))
const fetchPresentations = () => fetch('https://raw.githubusercontent.com/categolj/misc/master/presos.json')
    .then(data => data.json());

export default function Home({entries}) {
    const {data: latest, error: errorLatest} = useSWR({cursor: '', size: 15}, fetchEntries);
    const {data: github, error: errorGithub} = useSWR('/github', fetchGithub);
    const {data: presos, error: errorPresos} = useSWR('/presos', fetchPresentations);
    return (<div>
        <Head>
            <title>IK.AM</title>
            <link rel="alternate" type="application/rss+xml" title="IK.AM"
                  href="/feed"/>
        </Head>
        <h2>Home</h2>
        <h3>Latest Entries</h3>
        <ListEntries entries={entries || latest}/>
        <h3>Recent GitHub Updates</h3>
        <Github items={github}/>
        <h3>Presentations</h3>
        <Presentations items={presos}/>
    </div>);
}

export async function getServerSideProps({req}) {
    const entries = isPC(req.headers) ? null : await fetchEntries({size: 10});
    return {props: {entries: entries}};
}