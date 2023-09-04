import ApiService from './ApiService'

export async function apiGetAllRequests() {
    return ApiService.fetchData({
        url: '/contact-us/all',
        method: 'get',
        headers: {
            'Accept-Language': 'ar',
        },
    })
}

export async function apiGetRequestDetails<
    T,
    U extends Record<string, unknown>
>(params: U) {
    return ApiService.fetchData({
        url: `/contact-us/details/${params._id}`,
        method: 'get',
    })
}
