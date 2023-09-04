import ApiService from './ApiService'

export async function apiGetAllProjects() {
    return ApiService.fetchData({
        url: '/project/all',
        method: 'get',
        headers: {
            'Accept-Language': 'ar',
        },
    })
}

export async function apiDeleteProject(data: any) {
    return ApiService.fetchData({
        url: `/project/:delete/${data._id}`,
        method: 'delete',
    })
}

export async function apiAddNewProject(data: any) {
    return ApiService.fetchData({
        url: '/project/add',
        method: 'post',
        data,
    })
}

export async function apiGetProject<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData({
        url: '/service/details/' + params._id,
        method: 'get',
    })
}

export async function apiUpdateProject(data: any, id: string) {
    return ApiService.fetchData({
        url: '/project/update/' + id,
        method: 'put',
        data,
    })
}
