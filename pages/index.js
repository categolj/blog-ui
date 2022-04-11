import {ListEntries} from "./entries";
import {isPC} from "../utils/userAgents";
import useSWR from "swr";
import {entriesFetcherHttp, entriesFetcherRSocket} from "../utils/fetcher";
import Github from "../components/github";
import Presentations from "../components/presentations";

const fetchGithub = () => fetch('https://api.github.com/search/repositories?q=user:making&sort=updated&order=desc')
    .then(data => data.json())
    .then(json => json.items.slice(0, 10))
const fetchPresentations = () => fetch('https://raw.githubusercontent.com/categolj/misc/master/presos.json')
    .then(data => data.json());

export default function Home({entries}) {
    const {data: latest, error: errorLatest} = useSWR({size: 10}, entriesFetcherRSocket);
    const {data: github, error: errorGithub} = useSWR('/github', fetchGithub);
    const {data: presos, error: errorPresos} = useSWR('/presos', fetchPresentations);
    return (
        <div>
            <h2>Home</h2>
            <h3>Latest Entries</h3>
            <ListEntries entries={entries || latest}/>
            <h3>Recent GitHub Updates</h3>
            <Github items={github}/>
            <h3>Presentations</h3>
            <Presentations items={presos}/>
        </div>
    );
}

export async function getServerSideProps({req}) {
    const entries = isPC(req.headers) ? null : await entriesFetcherHttp({size: 10});
    return {props: {entries: entries}};
}