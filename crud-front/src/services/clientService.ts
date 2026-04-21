import apiFetchData from "./ApiFetchData";

const getList = async() => {
    return await apiFetchData({
        method: 'GET',
        url: '/client/list'
    });
}

const searchCust = async(val: string) => {
    return await apiFetchData({
        method: 'GET',
        url: `/client/search/${val}`
    });
}

export {
    getList,
    searchCust,
}