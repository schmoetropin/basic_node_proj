const apiRoot = `${import.meta.env.VITE_API_URL}/api`;

interface ApiFetchData {
    method: string,
    url: string,
    data?: any
};

interface RequestData {
    headers: any,
    method: string,
    body?: string,
}

export default async function apiFetchData({method, url, data}: ApiFetchData){
    let fullPath = `${apiRoot}${url}`;

    let headers = {
        "content-type": "application/json",
        "accept": "application/json",
    }

    let requestData: RequestData = {
        method,
        headers
    }

    if (data) {
        requestData = {
            ...requestData,
            body: JSON.stringify(data),
        }
    }

    let resp = await fetch(fullPath, requestData);

    if (resp.ok) {
        let r = await resp.json();
        return {
            success: true,
            data: r,
        };
    } else {
        return {
            success: false,
            data: resp,
        }
    }
}