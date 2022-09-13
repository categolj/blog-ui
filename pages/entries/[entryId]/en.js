import {useRouter} from "next/router";
import {formatId} from "../index";

export default function English() {
    const router = useRouter();
    let {entryId} = router.query;
    const url = `https://github-com.translate.goog/making/blog.ik.am/blob/master/content/${formatId(entryId)}.md?_x_tr_sl=ja&_x_tr_tl=en&_x_tr_hl=ja&_x_tr_pto=wapp`;
    return (
        <div>
            <article>
                Sorry, the translation page is not currently supported.<br/>
                Please use Google Translate bellow:<br/>
                <a href={url}>{url}</a>
            </article>
        </div>
    )
}