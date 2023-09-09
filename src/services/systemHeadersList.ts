import ApiService from './ApiService'

export async function apiGetAllHeaders() {
    return ApiService.fetchData({
        url: '/system/all',
        method: 'get',
        headers: {
            'Accept-Language': 'ar',
        },
    })
}

export async function apiDeleteHeader<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData({
        url: `/system/delete/${params._id}`,
        method: 'delete',
    })
}

export async function apiAddHeader(data: any) {
    return ApiService.fetchData({
        url: '/system/add',
        method: 'post',
        data,
    })
}
