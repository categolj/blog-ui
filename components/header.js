import Link from 'next/link';
import ThemeButton from "./theme-button";
import SearchBox from "./searchbox";
import {useRouter} from 'next/router';

export default function Header() {
    const router = useRouter();

    const Item = ({children}) => <li
        className="inline pr-3 font-semibold"
    >{children}</li>;
    return (<div>
        <h1 style={{display: 'none'}}><Link href="/">IK.AM</Link></h1>
        <p className="banner" onClick={() => router.push('/')} aria-hidden={true}>
            ╭━━┳╮╭━╮╭━━━┳━╮╭━╮<br/>
            ╰┫┣┫┃┃╭╯┃╭━╮┃┃╰╯┃┃<br/>
            ╱┃┃┃╰╯╯╱┃┃╱┃┃╭╮╭╮┃<br/>
            ╱┃┃┃╭╮┃╱┃╰━╯┃┃┃┃┃┃<br/>
            ╭┫┣┫┃┃╰┳┫╭━╮┃┃┃┃┃┃<br/>
            ╰━━┻╯╰━┻┻╯╱╰┻╯╰╯╰╯<br/>
        </p>
        <p>
            <a href="https://twitter.com/making">@making</a>&apos;s tech note
        </p>
        <SearchBox/>
        <ul className="list-disc list-inside">
            <Item>
                <Link href="/">
                    <span style={{textDecoration: 'none'}}>Home</span>
                </Link>
            </Item>
            <Item>
                <Link href="/entries">
                    <span style={{textDecoration: 'none'}}>Entries</span>
                </Link>
            </Item>
            <Item>
                <Link href="/categories">
                    <span style={{textDecoration: 'none'}}>Categories</span>
                </Link>
            </Item>
            <Item>
                <Link href="/tags">
                    <span style={{textDecoration: 'none'}}>Tags</span>
                </Link>
            </Item>
            <Item>
                <Link href="/notes">
                    <span style={{textDecoration: 'none'}}>Note</span>
                </Link>
            </Item>
            <Item>
                <Link href="/aboutme">
                    <span style={{textDecoration: 'none'}}>About</span>
                </Link>
            </Item>
            <Item>
                <ThemeButton/>
            </Item>
        </ul>
    </div>);
}