import {formatId} from "../pages/entries";
import {
    FacebookIcon,
    FacebookShareButton,
    LineIcon,
    LineShareButton,
    TwitterIcon,
    TwitterShareButton
} from "react-share";
import ScrollToTop from "react-scroll-to-top";
import entryLang from "./entry-lang";

export default function EntryFooter({entry, lang}) {
    const entryId = entry.entryId;
    return <>
        <div className="text-sm">
            <span>
                ✒️️&nbsp;<a
                href={`${entryLang[lang].githubBath}/edit/${entryLang[lang].githubBranch}/content/${formatId(entryId)}.md`}>Edit</a>&nbsp;
                ⏰&nbsp;<a
                href={`${entryLang[lang].githubBath}/commits/${entryLang[lang].githubBranch}/content/${formatId(entryId)}.md`}>History</a>&nbsp;
                🗑&nbsp;<a
                href={`${entryLang[lang].githubBath}/delete/${entryLang[lang].githubBranch}/content/${formatId(entryId)}.md`}>Delete</a>&nbsp;
            </span>
        </div>
        <hr/>
        <TwitterShareButton url={`https://ik.am${entryLang[lang].entryPath(entryId)}`}
                            title={`${entry.frontMatter.title}`}>
            <TwitterIcon size={32} round={true}/>
        </TwitterShareButton>&nbsp;
        <FacebookShareButton url={`https://ik.am${entryLang[lang].entryPath(entryId)}`}
                             title={`${entry.frontMatter.title}`}>
            <FacebookIcon size={32} round={true}/>
        </FacebookShareButton>&nbsp;
        <LineShareButton url={`https://ik.am${entryLang[lang].entryPath(entryId)}`}
                         title={`${entry.frontMatter.title}`}>
            <LineIcon size={32} round={true}/>
        </LineShareButton>&nbsp;
        <ScrollToTop smooth style={{paddingLeft: '5px'}}/>
    </>;
}