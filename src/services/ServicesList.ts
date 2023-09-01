import ApiService from './ApiService'

export async function apiGetAllServices() {
    return ApiService.fetchData({
        url: '/service/all',
        method: 'get',
        headers: {
            'Accept-Language': 'ar',
        },
    })
}

export async function apiDeleteService(data: any) {
    console.log(data)

    return ApiService.fetchData({
        url: `/service/delete/${data._id}`,
        method: 'delete',
    })
}

export async function apiAddNewService(data: any) {
    return ApiService.fetchData({
        url: '/service/add',
        method: 'post',
        data,
    })
}

export async function apiGetService<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData({
        url: '/service/details/' + params._id,
        method: 'get',
    })
}

export async function apiUpdateService(data: any, id: string) {
    return ApiService.fetchData({
        url: '/service/update/' + id,
        method: 'put',
        data,
    })
}
