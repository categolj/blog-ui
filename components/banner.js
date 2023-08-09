export default function Banner({onClick}) {
    return <p className="banner" onClick={onClick} aria-hidden={true}>
        ╭━━┳╮╭━╮╭━━━┳━╮╭━╮<br/>
        ╰┫┣┫┃┃╭╯┃╭━╮┃┃╰╯┃┃<br/>
        ╱┃┃┃╰╯╯╱┃┃╱┃┃╭╮╭╮┃<br/>
        ╱┃┃┃╭╮┃╱┃╰━╯┃┃┃┃┃┃<br/>
        ╭┫┣┫┃┃╰┳┫╭━╮┃┃┃┃┃┃<br/>
        ╰━━┻╯╰━┻┻╯╱╰┻╯╰╯╰╯<br/>
    </p>;
}