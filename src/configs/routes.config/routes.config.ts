import { lazy } from 'react'
import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'home',
        path: '/home',
        component: lazy(() => import('@/views/Home')),
        authority: [],
    },
    /** Example purpose only, please remove */

    {
        key: 'services.allServices',
        path: '/services',
        component: lazy(
            () => import('@/views/app/Services/ServicesList/ServicesList')
        ),
        authority: [],
    },
    {
        key: 'services.addService',
        path: '/add-service',
        component: lazy(
            () => import('@/views/app/Services/AddService/AddService')
        ),
        authority: [],
    },
    {
        key: 'services.editService',
        path: '/edit-service/:id',
        component: lazy(
            () => import('@/views/app/Services/ServiceEdit/ServiceEdit')
        ),
        authority: [],
    },

    {
        key: 'articles.allArticles',
        path: '/articles',
        component: lazy(
            () => import('@/views/app/Articles/ArticlesList/ArticlesList')
        ),
        authority: [],
    },
    {
        key: 'services.addArticle',
        path: '/add-article',
        component: lazy(
            () => import('@/views/app/Articles/AddArticle/AddArticle')
        ),
        authority: [],
    },
    {
        key: 'services.editArticle',
        path: '/edit-article/:id',
        component: lazy(
            () => import('@/views/app/Articles/ArticleEdit/ArticleEdit')
        ),
        authority: [],
    },

    {
        key: 'testimonials.allTestimonials',
        path: '/testimonials',
        component: lazy(
            () =>
                import(
                    '@/views/app/Testimonial/TestimonialsList/TestimonialsList'
                )
        ),
        authority: [],
    },
    {
        key: 'testimonials.addTestimonial',
        path: '/add-testimonial',
        component: lazy(() => import('@/views/app/Testimonial/AddTestimonial')),
        authority: [],
    },
    {
        key: 'testimonials.editTestimonial',
        path: '/edit-testimonial/:id',
        component: lazy(
            () => import('@/views/app/Testimonial/TestimonialEdit')
        ),
        authority: [],
    },

    {
        key: 'jobs.allJobs',
        path: '/jobs',
        component: lazy(() => import('@/views/app/Jobs/JobsList')),
        authority: [],
    },
    {
        key: 'jobs.addJob',
        path: '/add-job',
        component: lazy(() => import('@/views/app/Jobs/AddJob')),
        authority: [],
    },
    // {
    //     key: 'jobs.editJob',
    //     path: '/edit-testimonial/:id',
    //     component: lazy(
    //         () => import('@/views/app/Testimonial/TestimonialEdit')
    //     ),
    //     authority: [],
    // },
]
