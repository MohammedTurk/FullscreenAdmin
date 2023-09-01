import { useEffect } from 'react'
import Loading from '@/components/shared/Loading'
import DoubleSidedImage from '@/components/shared/DoubleSidedImage'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import reducer, {
    getArticle,
    useAppSelector,
    useAppDispatch,
    deleteArticle,
    updateArticle,
} from './store'
import { injectReducer } from '@/store'
import { useLocation, useNavigate } from 'react-router-dom'

import ArticleForm, {
    FormModel,
    SetSubmitting,
    OnDeleteCallback,
} from '@/views/app/Articles/ArticleForm/ArticleForm'
import isEmpty from 'lodash/isEmpty'

injectReducer('articleEditSlice', reducer)

const ArticleEdit = () => {
    const dispatch = useAppDispatch()

    const location = useLocation()
    const navigate = useNavigate()

    const articleData = useAppSelector(
        (state) => state.articleEditSlice.data.articleData
    )
    const data: any = {
        tags: [],
    }
    if (articleData) {
        console.log('articleData', articleData)

        data.image = articleData?.data?.image
        data.content = articleData?.data?.content
        data.title = articleData?.data?.title
        articleData?.data?.tags.forEach((tag: string) => {
            data.tags.push(tag)
        })
        // data.arabicDescription = productData?.data?.description?.ar
        // data.englishDescription = productData?.data?.description?.en
        // data.arabicDetails = productData?.data?.details?.ar
        // data.englishDetails = productData?.data?.details?.en
        // data.image = productData?.data?.image
        // data.serviceNo = productData?.data?.serviceNo
    }

    const loading = useAppSelector(
        (state) => state.articleEditSlice.data.loading
    )

    const fetchData = (data: { _id: string }) => {
        dispatch(getArticle(data))
    }

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting
    ) => {
        setSubmitting(true)

        const success = await updateArticle(values, articleData?.data?._id)
        setSubmitting(false)
        if (success) {
            popNotification('updated')
        }
    }

    const handleDiscard = () => {
        navigate('/articles')
    }

    const handleDelete = async (setDialogOpen: OnDeleteCallback) => {
        setDialogOpen(false)
        const success = await deleteArticle({ _id: articleData?.data?._id })
        if (success) {
            popNotification('deleted')
        }
    }

    const popNotification = (keyword: string) => {
        toast.push(
            <Notification
                title={`Successfuly ${keyword}`}
                type="success"
                duration={2500}
            >
                Article successfuly {keyword}
            </Notification>,
            {
                placement: 'top-center',
            }
        )
        navigate('/articles')
    }

    useEffect(() => {
        const path = location.pathname.substring(
            location.pathname.lastIndexOf('/') + 1
        )
        console.log(path)

        const rquestParam = { _id: path }
        fetchData(rquestParam)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    return (
        <>
            <Loading loading={loading}>
                {!isEmpty(articleData) && (
                    <>
                        <ArticleForm
                            type="edit"
                            initialData={data}
                            onFormSubmit={handleFormSubmit}
                            onDiscard={handleDiscard}
                            onDelete={handleDelete}
                        />
                    </>
                )}
            </Loading>
            {!loading && isEmpty(articleData) && (
                <div className="h-full flex flex-col items-center justify-center">
                    <DoubleSidedImage
                        src="/img/others/img-2.png"
                        darkModeSrc="/img/others/img-2-dark.png"
                        alt="No product found!"
                    />
                    <h3 className="mt-8">No article found!</h3>
                </div>
            )}
        </>
    )
}

export default ArticleEdit
