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

const storeCust = async(data: any) => {
    return await apiFetchData({
        method: 'POST',
        url: `/client/store`, 
        data
    });
}

export {
    getList,
    searchCust,
    storeCust,
}