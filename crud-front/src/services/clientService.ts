import apiFetchData from "./ApiFetchData";

const getList = async() => {
    return await apiFetchData({
        method: 'GET',
        url: '/client/list'
    });
}

export {
    getList,
}