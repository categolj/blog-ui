import {useEffect, useState} from "react";
import {postCounter} from "../utils/counter";

export default function Counter({entryId}) {
    const [counter, setCounter] = useState(null);
    let sent = false;
    useEffect(() => {
        if (!sent) {
            postCounter(entryId).then(setCounter);
            sent = true;
        }
    }, []);
    return <> {counter && <><br/><span>{counter.counter} views since {counter.from}</span></>}</>;
}