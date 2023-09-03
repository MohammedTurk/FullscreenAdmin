import {
    NAV_ITEM_TYPE_ITEM,
    NAV_ITEM_TYPE_COLLAPSE,
} from '@/constants/navigation.constant'
import type { NavigationTree } from '@/@types/navigation'

const navigationConfig: NavigationTree[] = [
    {
        key: 'home',
        path: '/home',
        title: 'Home',
        translateKey: 'nav.home',
        icon: 'home',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },

    {
        key: 'services',
        path: '',
        title: 'Services Menu',
        translateKey: 'nav.services.services',
        icon: 'collapseMenu',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        subMenu: [
            {
                key: 'services.allServices',
                path: '/services',
                title: 'All Services',
                translateKey: 'nav.services.allServices',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'services.addService',
                path: '/add-service',
                title: 'Add Service',
                translateKey: 'nav.services.addService',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
        ],
    },
    {
        key: 'articles',
        path: '',
        title: 'Articles Menu',
        translateKey: 'nav.articles.articles',
        icon: 'articles',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        subMenu: [
            {
                key: 'articles.allArticles',
                path: '/articles',
                title: 'All Articles',
                translateKey: 'nav.articles.allArticles',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'articles.addArticle',
                path: '/add-article',
                title: 'Add Article',
                translateKey: 'nav.services.addArticle',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
        ],
    },
    {
        key: 'testimonials',
        path: '',
        title: 'testimonials Menu',
        translateKey: 'nav.articles.testimonials',
        icon: 'testimonials',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        subMenu: [
            {
                key: 'testimonials.allTestimonials',
                path: '/testimonials',
                title: 'All Testimonials',
                translateKey: 'nav.testimonials.allTestimonials',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'testimonials.addTestimonial',
                path: '/add-testimonial',
                title: 'Add Testimonial',
                translateKey: 'nav.testimonials.addTestimonial',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
        ],
    },
    {
        key: 'jobs',
        path: '',
        title: 'jobs Menu',
        translateKey: 'nav.jobs.jobs',
        icon: 'jobs',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        subMenu: [
            {
                key: 'jobs.allJobs',
                path: '/jobs',
                title: 'All Jobs',
                translateKey: 'nav.jobs.allJobs',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'jobs.addJob',
                path: '/add-job',
                title: 'Add Job',
                translateKey: 'nav.jobs.addJob',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'jobs.allJobApplications',
                path: '/job-applications',
                title: 'All Job Applications',
                translateKey: 'nav.jobs.allJobApplications',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
        ],
    },
]

export default navigationConfig
