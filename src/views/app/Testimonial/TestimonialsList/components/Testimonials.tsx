import { useEffect } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Tooltip from '@/components/ui/Tooltip'
import Loading from '@/components/shared/Loading'

import {
    useAppDispatch,
    useAppSelector,
    getAllTestimonials,
    toggleTestimonialDeleteConfirmation,
    setSelected,
    deleteTestimonial,
} from '../store'
import { useNavigate } from 'react-router-dom'
import { HiOutlineTrash, HiOutlinePencil } from 'react-icons/hi'
import Avatar from '@/components/ui/Avatar/Avatar'
import { ConfirmDialog } from '@/components/shared'
import { Notification, toast } from '@/components/ui'

const Testimonials = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const loading = useAppSelector(
        (state) => state.testimonialsSlice?.data?.loading
    )
    const testimonialsData = useAppSelector(
        (state) => state.testimonialsSlice?.data?.testimonialsData
    )
    console.log(
        'state.testimonialsSlice',
        useAppSelector((state) => state)
    )

    const testimonialsDeleteConfirmation = useAppSelector(
        (state) => state.testimonialsSlice?.data?.testimonialDeleteConfirmation
    )
    const selectedTestimonial = useAppSelector(
        (state) => state.testimonialsSlice?.data?.selected
    )

    const onTestimonialDelete = (_id: string) => {
        dispatch(setSelected({ _id }))
        dispatch(toggleTestimonialDeleteConfirmation(true))
    }
    const onTestimonialEdit = (_id: string) => {
        navigate(`/edit-testimonial/${_id}`)
    }
    const onTestimonialDeleteConfirm = async () => {
        const success = await deleteTestimonial({
            _id: selectedTestimonial._id,
        })

        if (success) {
            dispatch(toggleTestimonialDeleteConfirmation(false))
            dispatch(getAllTestimonials())
            toast.push(
                <Notification
                    title={'Successfuly Deleted'}
                    type="success"
                    duration={2500}
                >
                    Testimonial successfuly deleted
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
        dispatch(getAllTestimonials())
    }
    const onTestimonialDeleteConfirmationClose = () => {
        dispatch(toggleTestimonialDeleteConfirmation(false))
    }
    function createMarkup(data: any) {
        return { __html: data }
    }
    return (
        <Loading loading={loading} className="mt-[25.7%]">
            <div className="grid  lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-4">
                {testimonialsData?.data?.map((testimonial: any) => {
                    let content = testimonial?.content
                    if (content?.length > 50) {
                        content = content?.substring(0, 180) + ' ...'
                    }
                    const data = createMarkup(content)
                    return (
                        <Card key={testimonial?._id} bordered>
                            <h6 className="truncate mb-4">
                                {testimonial?.name}
                            </h6>
                            <div className="min-h-[60px]">
                                <span
                                    className="capitalize"
                                    dangerouslySetInnerHTML={data}
                                />
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <Avatar src={testimonial?.image} />
                                <div className="flex">
                                    <Tooltip title="Delete">
                                        <Button
                                            shape="circle"
                                            variant="plain"
                                            size="sm"
                                            icon={<HiOutlineTrash />}
                                            onClick={() =>
                                                onTestimonialDelete(
                                                    testimonial?._id
                                                )
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
                                                onTestimonialEdit(
                                                    testimonial?._id
                                                )
                                            }
                                        />
                                    </Tooltip>
                                </div>
                            </div>
                        </Card>
                    )
                })}

                <ConfirmDialog
                    isOpen={testimonialsDeleteConfirmation}
                    type="danger"
                    title="Delete testimonial"
                    confirmButtonColor="red-600"
                    onClose={onTestimonialDeleteConfirmationClose}
                    onRequestClose={onTestimonialDeleteConfirmationClose}
                    onCancel={onTestimonialDeleteConfirmationClose}
                    onConfirm={onTestimonialDeleteConfirm}
                >
                    <p>
                        Are you sure you want to delete this testimonial? This
                        action cannot be undone.
                    </p>
                </ConfirmDialog>
            </div>
        </Loading>
    )
}

export default Testimonials
