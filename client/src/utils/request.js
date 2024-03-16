export const request = (url, method, data) => {
    return fetch(`http://localhost:3001${url}`, {
        headers: {
            "content-type": "application/json",
        },
        method: method || "GET",
        credentials: "include",
        body: data ? JSON.stringify(data) : undefined,
    }).then((res) => res.json());
};
