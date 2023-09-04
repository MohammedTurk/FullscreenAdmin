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
    {
        key: 'jobs.editJob',
        path: '/edit-job/:id',
        component: lazy(() => import('@/views/app/Jobs/EditJob')),
        authority: [],
    },
    {
        key: 'jobs.allJobApplications',
        path: '/job-applications',
        component: lazy(
            () =>
                import(
                    '@/views/app/Jobs/JopApplicationsList/JopApplicationsList'
                )
        ),
        authority: [],
    },
    {
        key: 'jobs.singleJobApplicationList',
        path: '/view-job-Application/:id',
        component: lazy(
            () =>
                import(
                    '@/views/app/Jobs/JopApplicationsList/SingleJobApplicationList'
                )
        ),
        authority: [],
    },
    {
        key: 'jobs.JobApplicationDetailsForm',
        path: '/job-Application-details/:id',
        component: lazy(
            () =>
                import(
                    '@/views/app/Jobs/JopApplicationsList/JobApplicationDetails'
                )
        ),
        authority: [],
    },

    {
        key: 'packages.allPackages',
        path: '/allPackages',
        component: lazy(() => import('@/views/app/Packages/PackagesList')),
        authority: [],
    },

    {
        key: 'packages.packageItems',
        path: '/package/:id',
        component: lazy(() => import('@/views/app/Packages/PackageItemsList')),
        authority: [],
    },
    {
        key: 'packages.addPackageParent',
        path: '/add-package',
        component: lazy(
            () => import('@/views/app/Packages/AddPackage/AddParentPackage')
        ),
        authority: [],
    },
    {
        key: 'packages.addPackage',
        path: '/add-package/:id',
        component: lazy(
            () => import('@/views/app/Packages/AddPackage/AddPackage')
        ),
        authority: [],
    },

    {
        key: 'packages.editPackage',
        path: '/edit-package/:id',
        component: lazy(() => import('@/views/app/Packages/EditPackage')),
        authority: [],
    },

    {
        key: 'packages.editSubPackage',
        path: '/edit-sub-package/:id',
        component: lazy(
            () => import('@/views/app/Packages/EditPackage/EditPackage')
        ),
        authority: [],
    },
    {
        key: 'packages.packageDetails',
        path: '/view-package-details/:id',
        component: lazy(
            () => import('@/views/app/Packages/PackageItemsList/PackageDetails')
        ),
        authority: [],
    },

    {
        key: 'projects.allProjects',
        path: '/allProjects',
        component: lazy(() => import('@/views/app/Projects/ProjectsList')),
        authority: [],
    },
    {
        key: 'projects.addProject',
        path: '/add-Project',
        component: lazy(() => import('@/views/app/Projects/AddProject')),
        authority: [],
    },
    {
        key: 'projects.editProject',
        path: '/edit-Project/:id',
        component: lazy(() => import('@/views/app/Projects/ProjectEdit')),
        authority: [],
    },
    {
        key: 'contactUs.allRequests',
        path: '/allRequests',
        component: lazy(() => import('@/views/app/Contactus/ContactusList')),
        authority: [],
    },
]
