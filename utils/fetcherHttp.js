import urlProvider from "./urlProvider";

const tenantPrefix = (tenantId) => {
    return tenantId ? `/tenants/${tenantId}` : '';
};

const basicAuth = {
    headers: {
        'Authorization': 'Basic ' + btoa(`blog-ui:empty`)
    }
};

export async function fetchEntries(data, tenantId) {
    const params = new URLSearchParams();
    for (let k in data) {
        params.set(k, data[k]);
    }
    if (params.get('tag') === 'undefined') {
        return [];
    }
    if (params.get('categories') === 'undefined') {
        return [];
    }
    return fetch(`${urlProvider.BLOG_API}${tenantPrefix(tenantId)}/entries?${params}`, basicAuth).then(res => res.json()).then(j => j.content);
}

export async function fetchEntry(entryId, tenantId) {
    return fetch(`${urlProvider.BLOG_API}${tenantPrefix(tenantId)}/entries/${entryId}`, basicAuth).then(res => res.json());
}

export async function fetchTags(tenantId) {
    return fetch(`${urlProvider.BLOG_API}${tenantPrefix(tenantId)}/tags`, basicAuth).then(res => res.json());
}

export async function fetchCategories(tenantId) {
    return fetch(`${urlProvider.BLOG_API}${tenantPrefix(tenantId)}/categories`, basicAuth).then(res => res.json());
}

export async function fetchInfo() {
    return fetch(`${urlProvider.BLOG_API}/info`).then(res => res.json());
}

export async function fetchNoteInfo() {
    return fetch(`${urlProvider.NOTE_API}/info`).then(res => res.json());
}