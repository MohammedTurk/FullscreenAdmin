import ApiService from './ApiService'

export async function apiGetAllJobs() {
    return ApiService.fetchData({
        url: '/job/all',
        method: 'get',
        headers: {
            'Accept-Language': 'ar',
        },
    })
}

export async function apiDeleteJob(data: any) {
    return ApiService.fetchData({
        url: `/testimonial/delete/${data._id}`,
        method: 'delete',
    })
}

export async function apiAddNewJob(data: any) {
    return ApiService.fetchData({
        url: '/job/add',
        method: 'post',
        data,
    })
}

export async function apiGetJobDetails<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData({
        url: '/job/details/' + params._id,
        method: 'get',
        headers: {
            'Accept-Language': 'ar',
        },
    })
}

export async function apiUpdateJob(data: any, id: string) {
    return ApiService.fetchData({
        url: '/job/update/' + id,
        method: 'put',
        data,
    })
}
