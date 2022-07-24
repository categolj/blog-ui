import Link from 'next/link';
import ThemeButton from "./theme-button";
import SearchBox from "./searchbox";

export default function Header() {
    const Item = ({children}) => <li
        className="inline pr-3 font-semibold"
    >{children}</li>;
    return (
        <div>
            <h1><Link href="/"><a>IK.AM</a></Link></h1>
            <p>
                <a href="https://twitter.com/making">@making</a>&apos;s tech note
            </p>
            <SearchBox/>
            <ul className="list-disc list-inside">
                <Item>
                    <Link href="/">
                        <a style={{textDecoration: 'none'}}>Home</a>
                    </Link>
                </Item>
                <Item>
                    <Link href="/entries">
                        <a style={{textDecoration: 'none'}}>Entries</a>
                    </Link>
                </Item>
                <Item>
                    <Link href="/categories">
                        <a style={{textDecoration: 'none'}}>Categories</a>
                    </Link>
                </Item>
                <Item>
                    <Link href="/tags">
                        <a style={{textDecoration: 'none'}}>Tags</a>
                    </Link>
                </Item>
                <Item>
                    <Link href="/aboutme">
                        <a style={{textDecoration: 'none'}}>About</a>
                    </Link>
                </Item>
                <Item>
                    <a style={{textDecoration: 'none'}} href="https://blog.ik.am"
                       rel="noopener noreferrer">Old UI</a>
                </Item>
                <Item>
                    <ThemeButton/>
                </Item>
            </ul>
        </div>
    );
}