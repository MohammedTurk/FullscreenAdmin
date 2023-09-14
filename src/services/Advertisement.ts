import ApiService from './ApiService'

// export async function apiGetAllArticles() {
//     return ApiService.fetchData({
//         url: '/article/all',
//         method: 'get',
//         headers: {
//             'Accept-Language': 'ar',
//         },
//     })
// }

// export async function apiDeleteArticle(data: any) {
//     return ApiService.fetchData({
//         url: `/article/delete/${data._id}`,
//         method: 'delete',
//     })
// }

export async function apiAddNewAdvertisement(data: any) {
    return ApiService.fetchData({
        url: '/announcement/add',
        method: 'post',
        data,
    })
}

// export async function apiGetArticleDetails<
//     T,
//     U extends Record<string, unknown>
// >(params: U) {
//     return ApiService.fetchData({
//         url: '/article/details/' + params._id,
//         method: 'get',
//         headers: {
//             'Accept-Language': 'ar',
//         },
//     })
// }

// export async function apiUpdateArticle(data: any, id: string) {
//     return ApiService.fetchData({
//         url: '/article/update/' + id,
//         method: 'put',
//         data,
//     })
// }
