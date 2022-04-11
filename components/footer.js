import Link from "next/link";

export default function Footer() {
    return (
        <footer>
            <Link href="/"><a>IK.AM</a></Link> — &copy; 2010-{new Date().getFullYear()}
            &nbsp;<Link href="/aboutme"><a>Toshiaki Maki</a></Link>
        </footer>
    );
}