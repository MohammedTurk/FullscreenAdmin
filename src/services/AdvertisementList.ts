import ApiService from './ApiService'

export async function apiGetAllAdvertisements() {
    return ApiService.fetchData({
        url: '/announcement/list',
        method: 'get',
    })
}

export async function apiDeleteAdvertisement(data: any) {
    return ApiService.fetchData({
        url: `/announcement/delete/${data._id}`,
        method: 'delete',
    })
}

export async function apiAddNewAdvertisement(data: any) {
    return ApiService.fetchData({
        url: '/announcement/add',
        method: 'post',
        data,
    })
}

export async function apiGetAdvertisementDetails<
    T,
    U extends Record<string, unknown>
>(params: U) {
    return ApiService.fetchData({
        url: '/announcement/details/' + params._id,
        method: 'get',
    })
}

export async function apiUpdateAdvertisement(data: any, id: string) {
    return ApiService.fetchData({
        url: '/announcement/update/' + id,
        method: 'put',
        data,
    })
}
