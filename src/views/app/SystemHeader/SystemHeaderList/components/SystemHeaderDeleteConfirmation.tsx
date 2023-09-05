import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import {
    toggleDeleteConfirmation,
    useAppDispatch,
    useAppSelector,
    deleteHeader,
    getAllHeaders,
} from '../store'

const SystemHeaderDeleteConfirmation = () => {
    const dispatch = useAppDispatch()
    const dialogOpen = useAppSelector(
        (state) => state.systemHeaderListSlice.data.deleteConfirmation
    )
    const selectedHeader = useAppSelector(
        (state) => state.systemHeaderListSlice.data.selectedHeader
    )

    const onDialogClose = () => {
        dispatch(toggleDeleteConfirmation(false))
    }

    const onDelete = async () => {
        dispatch(toggleDeleteConfirmation(false))
        const success = await deleteHeader({ _id: selectedHeader })

        if (success) {
            dispatch(getAllHeaders())
            toast.push(
                <Notification
                    title={'Successfuly Deleted'}
                    type="success"
                    duration={2500}
                >
                    Header successfuly deleted
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
            title="Delete header"
            confirmButtonColor="red-600"
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            onCancel={onDialogClose}
            onConfirm={onDelete}
        >
            <p>Are you sure you want to delete this header?</p>
        </ConfirmDialog>
    )
}

export default SystemHeaderDeleteConfirmation
