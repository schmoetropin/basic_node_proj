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

const updateCust = async(data: any, id: Number) => {
    return await apiFetchData({
        method: 'PUT',
        url: `/client/update/${id}`, 
        data
    });
}

const showCust = async(id: number) => {
    return await apiFetchData({
        method: 'GET',
        url: `/client/show/${id}`
    });
}

const statusCust = async(id: number) => {
    return await apiFetchData({
        method: 'PUT',
        url: `/client/status/${id}`
    });
}

export {
    getList,
    searchCust,
    storeCust,
    updateCust,
    showCust,
    statusCust,
}