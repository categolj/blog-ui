import {useEffect} from 'react'
import Router from "next/router";
import tokenHolder from "../../utils/tokenHolder";

export default function Index() {
    useEffect(() => {
        tokenHolder.clear();
        Router.push('/notes');
    });
    return <p>Redirecting...</p>;
}