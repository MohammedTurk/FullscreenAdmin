import ApiService from './ApiService'

export async function apiGetAllTestimonials() {
    return ApiService.fetchData({
        url: '/testimonial/all',
        method: 'get',
        headers: {
            'Accept-Language': 'ar',
        },
    })
}

export async function apiDeleteTestimonial(data: any) {
    return ApiService.fetchData({
        url: `/testimonial/delete/${data._id}`,
        method: 'delete',
    })
}

export async function apiAddNewTestimonial(data: any) {
    return ApiService.fetchData({
        url: '/testimonial/add',
        method: 'post',
        data,
    })
}

export async function apiGetTestimonialDetails<
    T,
    U extends Record<string, unknown>
>(params: U) {
    return ApiService.fetchData({
        url: '/testimonial/details/' + params._id,
        method: 'get',
        headers: {
            'Accept-Language': 'ar',
        },
    })
}

export async function apiUpdateTestimonial(data: any, id: string) {
    return ApiService.fetchData({
        url: '/testimonial/update/' + id,
        method: 'put',
        data,
    })
}
