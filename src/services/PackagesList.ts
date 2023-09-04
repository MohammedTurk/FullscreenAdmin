import ApiService from './ApiService'

export async function apiGetAllPackages() {
    return ApiService.fetchData({
        url: '/package/all',
        method: 'get',
        headers: {
            'Accept-Language': 'ar',
        },
    })
}

export async function apiGetPackageItems(data: any) {
    return ApiService.fetchData({
        url: `/package/info/${data._id}`,
        method: 'get',
        headers: {
            'Accept-Language': 'ar',
        },
    })
}

// export async function apiGetSingleJobApplicationList(data: any) {
//     return ApiService.fetchData({
//         url: `/job/applications?jobId=${data._id}`,
//         method: 'get',
//         headers: {
//             'Accept-Language': 'ar',
//         },
//     })
// }

// export async function apiGetSingleJopApplicationDetails(data: any) {
//     return ApiService.fetchData({
//         url: `/job/applications/details/${data._id}`,
//         method: 'get',
//     })
// }

export async function apiDeletePackage(data: any) {
    return ApiService.fetchData({
        url: `/package/delete/${data._id}`,
        method: 'delete',
    })
}

export async function apiAddNewPackage(data: any) {
    return ApiService.fetchData({
        url: '/package/add',
        method: 'post',
        data,
    })
}

export async function apiGetPackageData<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData({
        url: '/package/info/' + params._id,
        method: 'get',
        headers: {
            'Accept-Language': 'ar',
        },
    })
}

export async function apiGetPackageDetails<
    T,
    U extends Record<string, unknown>
>(params: U) {
    return ApiService.fetchData({
        url: '/package/details/' + params._id,
        method: 'get',
        headers: {
            'Accept-Language': 'ar',
        },
    })
}

export async function apiUpdatePackage(data: any, id: string) {
    return ApiService.fetchData({
        url: '/package/add' + id,
        method: 'put',
        data,
    })
}
