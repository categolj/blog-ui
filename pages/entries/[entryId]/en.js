import {useRouter} from "next/router";

export default function English() {
    const router = useRouter();
    let {entryId} = router.query;
    const url = `https://blog.ik.am/entries/${entryId}/en`;
    return (
        <div>
            <article>Please visit <a href={url}>{url}</a></article>
        </div>
    )
}