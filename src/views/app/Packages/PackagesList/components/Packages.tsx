import { useEffect } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Tooltip from '@/components/ui/Tooltip'
import Loading from '@/components/shared/Loading'

import {
    useAppDispatch,
    useAppSelector,
    setSelected,
    togglePackageDeleteConfirmation,
    getAllPackages,
    deletePackage,
} from '../store'
import { useNavigate } from 'react-router-dom'
import { HiOutlineTrash, HiOutlinePencil, HiEye } from 'react-icons/hi'
import { ConfirmDialog } from '@/components/shared'
import { Badge, Notification, toast } from '@/components/ui'

const Packages = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const loading = useAppSelector(
        (state) => state.PackagesListSlice?.data?.loading
    )
    const packagesData = useAppSelector(
        (state) => state.PackagesListSlice?.data?.packagesData
    )

    const packageDeleteConfirmation = useAppSelector(
        (state) => state.PackagesListSlice?.data?.packageDeleteConfirmation
    )
    const selectedPackage = useAppSelector(
        (state) => state.PackagesListSlice?.data?.selected
    )

    const onJobDelete = (_id: string) => {
        dispatch(setSelected({ _id }))
        dispatch(togglePackageDeleteConfirmation(true))
    }
    const onJobEdit = (_id: string) => {
        navigate(`/edit-job/${_id}`)
    }
    const onView = (_id: string) => {
        navigate(`/package/${_id}`)
    }

    const onJobDeleteConfirm = async () => {
        const success = await deletePackage({
            _id: selectedPackage._id,
        })
        if (success) {
            dispatch(togglePackageDeleteConfirmation(false))
            dispatch(getAllPackages())
            toast.push(
                <Notification
                    title={'Successfuly Deleted'}
                    type="success"
                    duration={2500}
                >
                    Package successfuly deleted
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
        }
    }

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchData = () => {
        dispatch(getAllPackages())
    }
    const onPackageDeleteConfirmationClose = () => {
        dispatch(togglePackageDeleteConfirmation(false))
    }

    return (
        <Loading loading={loading} className="mt-[25.7%]">
            <div className="grid  lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-4">
                {packagesData?.data?.map((packageItem: any) => {
                    return (
                        <Card key={packageItem?._id} bordered bodyClass="!p-0">
                            <div className="flex lg:flex-col xl:flex-row  justify-between items-start  ">
                                <img
                                    className=" object-cover rounded-tl-md max-h-[150px]"
                                    src={packageItem?.icon}
                                    alt={packageItem?.name}
                                />

                                <h6 className=" text-right p-3 max-w-md mb-4 md:mb-2 xl:mb-4">
                                    {packageItem?.name}
                                </h6>
                            </div>

                            <div className="flex items-center justify-between mt-1">
                                <div className="flex">
                                    <Tooltip title="Delete">
                                        <Button
                                            shape="circle"
                                            variant="plain"
                                            size="sm"
                                            icon={<HiOutlineTrash />}
                                            onClick={() =>
                                                onJobDelete(packageItem?._id)
                                            }
                                        />
                                    </Tooltip>
                                    <Tooltip title="Edit">
                                        <Button
                                            shape="circle"
                                            variant="plain"
                                            size="sm"
                                            icon={<HiOutlinePencil />}
                                            onClick={() =>
                                                onJobEdit(packageItem?._id)
                                            }
                                        />
                                    </Tooltip>
                                    <Tooltip title="View">
                                        <Button
                                            shape="circle"
                                            variant="plain"
                                            size="sm"
                                            icon={<HiEye />}
                                            onClick={() =>
                                                onView(packageItem?._id)
                                            }
                                        />
                                    </Tooltip>
                                </div>
                            </div>
                        </Card>
                    )
                })}

                <ConfirmDialog
                    isOpen={packageDeleteConfirmation}
                    type="danger"
                    title="Delete Package"
                    confirmButtonColor="red-600"
                    onClose={onPackageDeleteConfirmationClose}
                    onRequestClose={onPackageDeleteConfirmationClose}
                    onCancel={onPackageDeleteConfirmationClose}
                    onConfirm={onJobDeleteConfirm}
                >
                    <p>
                        Are you sure you want to delete this package? This
                        action cannot be undone.
                    </p>
                </ConfirmDialog>
            </div>
        </Loading>
    )
}

export default Packages
