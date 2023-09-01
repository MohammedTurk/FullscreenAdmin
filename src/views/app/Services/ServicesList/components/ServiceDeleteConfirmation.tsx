import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import {
    toggleDeleteConfirmation,
    deleteService,
    getAllServices,
    useAppDispatch,
    useAppSelector,
} from '../store'

const ServiceDeleteConfirmation = () => {
    const dispatch = useAppDispatch()
    const dialogOpen = useAppSelector(
        (state) => state.serviceListSlice.data.deleteConfirmation
    )
    const selectedService = useAppSelector(
        (state) => state.serviceListSlice.data.selectedService
    )

    const tableData = useAppSelector(
        (state) => state.serviceListSlice.data.tableData
    )

    const onDialogClose = () => {
        dispatch(toggleDeleteConfirmation(false))
    }

    const onDelete = async () => {
        dispatch(toggleDeleteConfirmation(false))
        const success = await deleteService({ _id: selectedService })

        if (success) {
            dispatch(getAllServices())
            toast.push(
                <Notification
                    title={'Successfuly Deleted'}
                    type="success"
                    duration={2500}
                >
                    Service successfuly deleted
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
            title="Delete service"
            confirmButtonColor="red-600"
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            onCancel={onDialogClose}
            onConfirm={onDelete}
        >
            <p>Are you sure you want to delete this service?</p>
        </ConfirmDialog>
    )
}

export default ServiceDeleteConfirmation
