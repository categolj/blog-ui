import urlProvider from "./urlProvider";

export async function fetchEntries(data) {
    const params = new URLSearchParams();
    for (let k in data) {
        params.set(k, data[k]);
    }
    return fetch(`${urlProvider.BLOG_API}/entries?${params}`).then(res => res.json()).then(j => j.content);
}

export async function fetchEntry(entryId) {
    return fetch(`${urlProvider.BLOG_API}/entries/${entryId}`).then(res => res.json());
}

export async function fetchTags() {
    return fetch(`${urlProvider.BLOG_API}/tags`).then(res => res.json());
}

export async function fetchCategories() {
    return fetch(`${urlProvider.BLOG_API}/categories`).then(res => res.json());
}

export async function fetchInfo() {
    return fetch(`${urlProvider.BLOG_API}/info`).then(res => res.json());
}