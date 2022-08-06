async function postData(url, data) {
    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json'
        },
    });
    return await res.json();
}

async function getMenuData(url) {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`не смог зафетчить ${url}, статус: ${res.status}`);
    }
    return await res.json();
}

export {postData};
export {getMenuData};