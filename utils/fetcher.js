import rsocketFactory from './RSocketFactory';
import urlProvider from "./urlProvider";

export async function entriesFetcherRSocket(data) {
    const rsocket = await rsocketFactory.getRSocket();
    const response = await rsocket.requestResponse({
        data: data,
        metadata: rsocketFactory.routingMetadata(`entries`)
    });
    return response.data.content;
}

export async function entriesFetcherHttp(data) {
    const params = new URLSearchParams();
    for (let k in data) {
        params.set(k, data[k]);
    }
    return fetch(`${urlProvider.BLOG_API}/entries?${params}`).then(res => res.json()).then(j => j.content);
}

export async function entryFetcherRSocket(entryId) {
    const rsocket = await rsocketFactory.getRSocket();
    const response = await rsocket.requestResponse({
        metadata: rsocketFactory.routingMetadata(`entries.${entryId}`)
    });
    return response.data;
}

export async function entryFetcherHttp(entryId) {
    return fetch(`${urlProvider.BLOG_API}/entries/${entryId}`).then(res => res.json());
}

export async function tagsFetcherRSocket() {
    const rsocket = await rsocketFactory.getRSocket();
    const response = await rsocket.requestResponse({
        metadata: rsocketFactory.routingMetadata(`tags`)
    });
    return response.data;
}


export async function categoriesFetcherRSocket() {
    const rsocket = await rsocketFactory.getRSocket();
    const response = await rsocket.requestResponse({
        metadata: rsocketFactory.routingMetadata(`categories`)
    });
    return response.data;
}