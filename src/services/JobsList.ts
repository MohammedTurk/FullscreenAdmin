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

export async function apiGetAllJobApplications() {
    return ApiService.fetchData({
        url: '/job/applications',
        method: 'get',
        headers: {
            'Accept-Language': 'ar',
        },
    })
}

export async function apiGetSingleJobApplicationList(data: any) {
    return ApiService.fetchData({
        url: `/job/applications?jobId=${data._id}`,
        method: 'get',
        headers: {
            'Accept-Language': 'ar',
        },
    })
}

export async function apiGetSingleJopApplicationDetails(data: any) {
    return ApiService.fetchData({
        url: `/job/applications/details/${data._id}`,
        method: 'get',
    })
}

export async function apiDeleteJob(data: any) {
    return ApiService.fetchData({
        url: `/job/delete/${data._id}`,
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
        url: '/job/info/' + params._id,
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
