
export async function fetchApi(method: string, params: { [k: string]: string } = {}) {
    return (await fetch(method, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    })).json();
};
