import rsocketFactory from './RSocketFactory';

export async function fetchEntries(data) {
    const rsocket = await rsocketFactory.getRSocket();
    const response = await rsocket.requestResponse({
        data: data,
        metadata: rsocketFactory.routingMetadata(`entries`)
    });
    return response.data.content;
}

export async function fetchEntry(entryId) {
    const rsocket = await rsocketFactory.getRSocket();
    const response = await rsocket.requestResponse({
        metadata: rsocketFactory.routingMetadata(`entries.${entryId}`)
    });
    return response.data;
}

export async function fetchTags() {
    const rsocket = await rsocketFactory.getRSocket();
    const response = await rsocket.requestResponse({
        metadata: rsocketFactory.routingMetadata(`tags`)
    });
    return response.data;
}

export async function fetchCategories() {
    const rsocket = await rsocketFactory.getRSocket();
    const response = await rsocket.requestResponse({
        metadata: rsocketFactory.routingMetadata(`categories`)
    });
    return response.data;
}