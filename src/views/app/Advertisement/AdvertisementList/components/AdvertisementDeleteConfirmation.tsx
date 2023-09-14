import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import {
    toggleDeleteConfirmation,
    useAppDispatch,
    useAppSelector,
    getAllAdvertisements,
    deleteAdvertisement,
} from '../store'

const AdvertisementDeleteConfirmation = () => {
    const dispatch = useAppDispatch()
    const dialogOpen = useAppSelector(
        (state) => state.AdvertisementListSlice.data.deleteConfirmation
    )
    const selectedAdvertisement = useAppSelector(
        (state) => state.AdvertisementListSlice.data.selectedAdvertisement
    )

    const tableData = useAppSelector(
        (state) => state.AdvertisementListSlice.data.tableData
    )

    const onDialogClose = () => {
        dispatch(toggleDeleteConfirmation(false))
    }

    const onDelete = async () => {
        dispatch(toggleDeleteConfirmation(false))
        const success = await deleteAdvertisement({
            _id: selectedAdvertisement,
        })

        if (success) {
            dispatch(getAllAdvertisements())
            toast.push(
                <Notification
                    title={'Successfuly Deleted'}
                    type="success"
                    duration={2500}
                >
                    Advertisement successfully deleted
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
            title="Delete Advertisement"
            confirmButtonColor="red-600"
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            onCancel={onDialogClose}
            onConfirm={onDelete}
        >
            <p>Are you sure you want to delete this advertisement?</p>
        </ConfirmDialog>
    )
}

export default AdvertisementDeleteConfirmation
