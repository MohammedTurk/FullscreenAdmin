import { useEffect } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Tooltip from '@/components/ui/Tooltip'
import Loading from '@/components/shared/Loading'

import {
    useAppDispatch,
    useAppSelector,
    setSelected,
    toggleJobsDeleteConfirmation,
    getAllJobs,
} from '../store'
import { useNavigate } from 'react-router-dom'
import { HiOutlineTrash, HiOutlinePencil } from 'react-icons/hi'
import { ConfirmDialog } from '@/components/shared'
import { Badge, Notification, toast } from '@/components/ui'

const Jobs = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const loading = useAppSelector((state) => state.JobsSlice?.data?.loading)
    const jobsData = useAppSelector((state) => state.JobsSlice?.data?.jobsData)

    const jobDeleteConfirmation = useAppSelector(
        (state) => state.JobsSlice?.data?.jobDeleteConfirmation
    )
    const selectedJob = useAppSelector(
        (state) => state.JobsSlice?.data?.selected
    )

    const onJobDelete = (_id: string) => {
        dispatch(setSelected({ _id }))
        dispatch(toggleJobsDeleteConfirmation(true))
    }
    const onJobEdit = (_id: string) => {
        navigate(`/edit-job/${_id}`)
    }
    const onTestimonialDeleteConfirm = async () => {
        // const success = await deleteTestimonial({
        //     _id: selectedJob._id,
        // })
        // if (success) {
        //     dispatch(toggleTestimonialDeleteConfirmation(false))
        //     dispatch(getAllTestimonials())
        //     toast.push(
        //         <Notification
        //             title={'Successfuly Deleted'}
        //             type="success"
        //             duration={2500}
        //         >
        //             Testimonial successfuly deleted
        //         </Notification>,
        //         {
        //             placement: 'top-center',
        //         }
        //     )
        // }
    }

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchData = () => {
        dispatch(getAllJobs())
    }
    const onTestimonialDeleteConfirmationClose = () => {
        dispatch(toggleJobsDeleteConfirmation(false))
    }
    function createMarkup(data: any) {
        return { __html: data }
    }
    return (
        <Loading loading={loading} className="mt-[25.7%]">
            <div className="grid  lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-4">
                {jobsData?.data?.map((job: any) => {
                    let description = job?.description
                    if (description?.length > 50) {
                        description = description?.substring(0, 180) + ' ...'
                    }
                    const data = createMarkup(description)
                    return (
                        <Card key={job?._id} bordered>
                            <div className="flex lg:flex-col xl:flex-row  justify-between items-start  ">
                                <h6 className="truncate max-w-md mb-4 md:mb-2 xl:mb-4">
                                    {job?.title}
                                </h6>
                                <Badge
                                    content={job?.category}
                                    className="bg-purple-800 !block md:!mb-4 lg:mb-0"
                                />
                            </div>
                            <div className="min-h-[60px]">
                                <span
                                    className="capitalize"
                                    dangerouslySetInnerHTML={data}
                                />
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <div className="flex">
                                    <Tooltip title="Delete">
                                        <Button
                                            shape="circle"
                                            variant="plain"
                                            size="sm"
                                            icon={<HiOutlineTrash />}
                                            onClick={() =>
                                                onJobDelete(job?._id)
                                            }
                                        />
                                    </Tooltip>
                                    <Tooltip title="Edit">
                                        <Button
                                            shape="circle"
                                            variant="plain"
                                            size="sm"
                                            icon={<HiOutlinePencil />}
                                            onClick={() => onJobEdit(job?._id)}
                                        />
                                    </Tooltip>
                                </div>
                                <Badge
                                    content={job?.type}
                                    className="bg-gray-400"
                                />
                            </div>
                        </Card>
                    )
                })}

                <ConfirmDialog
                    isOpen={jobDeleteConfirmation}
                    type="danger"
                    title="Delete job"
                    confirmButtonColor="red-600"
                    onClose={onTestimonialDeleteConfirmationClose}
                    onRequestClose={onTestimonialDeleteConfirmationClose}
                    onCancel={onTestimonialDeleteConfirmationClose}
                    onConfirm={onTestimonialDeleteConfirm}
                >
                    <p>
                        Are you sure you want to delete this job? This action
                        cannot be undone.
                    </p>
                </ConfirmDialog>
            </div>
        </Loading>
    )
}

export default Jobs
