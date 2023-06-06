export const postCounter = (entryId) => {
    return fetch("https://wws.fly.dev/counter", {
        method: 'POST',
        body: JSON.stringify({entryId: Number(entryId)})
    }).then(response => {
        if (!response.ok) {
            console.error('Counter Server Error: ' + response.status);
        }
        return response.json();
    }).catch(error => {
        console.error('Failed to post counter', error);
    });
};