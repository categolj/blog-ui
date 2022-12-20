import Link from "next/link";

export default function Footer() {
    return (
        <footer>
            <Link href="/">IK.AM</Link> — &copy; 2010-{new Date().getFullYear()}
            &nbsp;<Link href="/aboutme">Toshiaki Maki</Link>
        </footer>
    );
}