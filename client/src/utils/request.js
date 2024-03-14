export const request = (url, method, data) => {
    return fetch(`http://localhost:3001${url}`, {
        headers: {
            "content-type": "application/json",
        },
        method: method || "GET",
        body: data ? JSON.stringify(data) : undefined,
    }).then((res) => res.json());
};
