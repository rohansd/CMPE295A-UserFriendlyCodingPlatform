export const signin = async (payload) => {
    const options = {
        method: 'POST',
        headers:  {'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    }
    const response = await fetch('http://127.0.0.1:5000/user/signin', options);
    const status = response.status;
    const data = await response.json();
    return {status, data};
}


export const signup = async (payload) => {
    const options = {
        method: 'POST',
        headers: {'Content-Type':  'application/json'},
        body: JSON.stringify(payload),
    };

    const response = await fetch('http://127.0.0.1:5000/user/signup', options);
    const status = response.status;
    const data = await response.json();
    return {status, data};
}