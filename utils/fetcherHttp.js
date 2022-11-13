import urlProvider from "./urlProvider";

process.hrtime = require('browser-process-hrtime');

const {
    Tracer,
    BatchRecorder,
    jsonEncoder: {JSON_V2},
    ExplicitContext
} = require('zipkin');
const {HttpLogger} = require('zipkin-transport-http');

const determineServiceName = () => {
    const defaultServiceName = 'blog-ui';
    if ((typeof window === 'object')) {
        if (document.location.hostname.endsWith('maki.lol')) {
            return `${defaultServiceName}-dev`;
        }
        if (document.location.hostname.endsWith('ik.am')) {
            return defaultServiceName;
        }
        return `${defaultServiceName}-local`;
    } else {
        return defaultServiceName;
    }
};
const tracer = new Tracer({
    ctxImpl: new ExplicitContext(),
    recorder: new BatchRecorder({
        logger: new HttpLogger({
            endpoint: `${urlProvider.ZIPKIN_API}/api/v2/spans`,
            jsonEncoder: JSON_V2
        })
    }),
    traceId128Bit: true,
    localServiceName: determineServiceName()
});
const wrapFetch = require('zipkin-instrumentation-fetch');
const zipkinFetch = wrapFetch(fetch, {tracer});

export async function fetchEntries(data) {
    const params = new URLSearchParams();
    for (let k in data) {
        params.set(k, data[k]);
    }
    return zipkinFetch(`${urlProvider.BLOG_API}/entries?${params}`).then(res => res.json()).then(j => j.content);
}

export async function fetchEntry(entryId) {
    return zipkinFetch(`${urlProvider.BLOG_API}/entries/${entryId}`).then(res => res.json());
}

export async function fetchTags() {
    return zipkinFetch(`${urlProvider.BLOG_API}/tags`).then(res => res.json());
}

export async function fetchCategories() {
    return zipkinFetch(`${urlProvider.BLOG_API}/categories`).then(res => res.json());
}

export async function fetchInfo() {
    return zipkinFetch(`${urlProvider.BLOG_API}/info`).then(res => res.json());
}