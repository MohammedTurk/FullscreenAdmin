import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import {
    toggleDeleteConfirmation,
    deleteService,
    getAllArticles,
    useAppDispatch,
    useAppSelector,
} from '../store'

const ArticleDeleteConfirmation = () => {
    const dispatch = useAppDispatch()
    const dialogOpen = useAppSelector(
        (state) => state.articlesListSlice.data.deleteConfirmation
    )
    const selectedService = useAppSelector(
        (state) => state.articlesListSlice.data.selectedArticle
    )

    const tableData = useAppSelector(
        (state) => state.articlesListSlice.data.tableData
    )

    const onDialogClose = () => {
        dispatch(toggleDeleteConfirmation(false))
    }

    const onDelete = async () => {
        dispatch(toggleDeleteConfirmation(false))
        const success = await deleteService({ _id: selectedService })

        if (success) {
            dispatch(getAllArticles())
            toast.push(
                <Notification
                    title={'Successfuly Deleted'}
                    type="success"
                    duration={2500}
                >
                    Article successfuly deleted
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
        }
    }

    return (
        <ConfirmDialog
            isOpen={dialogOpen}
            type="danger"
            title="Delete article"
            confirmButtonColor="red-600"
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            onCancel={onDialogClose}
            onConfirm={onDelete}
        >
            <p>Are you sure you want to delete this article?</p>
        </ConfirmDialog>
    )
}

export default ArticleDeleteConfirmation
