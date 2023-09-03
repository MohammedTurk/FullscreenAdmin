import { useEffect, useMemo, useRef } from 'react'
import DataTable from '@/components/shared/DataTable'
import { HiEye } from 'react-icons/hi'
import reducer, {
    useAppDispatch,
    useAppSelector,
    getSingleJopApplicationList,
} from './store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { useNavigate } from 'react-router-dom'
import type {
    DataTableResetHandle,
    ColumnDef,
} from '@/components/shared/DataTable'
import { Container, DoubleSidedImage, StickyFooter } from '@/components/shared'
import { injectReducer } from '@/store'
import { Button } from '@/components/ui'
injectReducer('JopApplicationListSlice', reducer)

type JobApplication = {
    _id: string
    job: {
        _id: string
        title: string
    }
    firstName: string
    lastName: string
    email: string
    phone: string
    specialization: string
    cv: any
}

const ActionColumn = ({ row }: { row: JobApplication }) => {
    const dispatch = useAppDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onView = () => {
        navigate(`/job-Application-details/${row._id}`)
    }

    return (
        <div className="flex justify-end text-lg">
            <span
                className={`cursor-pointer p-2 hover:${textTheme}`}
                onClick={onView}
            >
                <HiEye />
            </span>
        </div>
    )
}

const SingleJobApplicationList = () => {
    const tableRef = useRef<DataTableResetHandle>(null)
    const dispatch = useAppDispatch()
    const data = useAppSelector((state) => state?.JopApplicationListSlice?.data)

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchData = () => {
        const path = location.pathname.substring(
            location.pathname.lastIndexOf('/') + 1
        )
        const rquestParam = { _id: path }
        dispatch(getSingleJopApplicationList(rquestParam))
    }

    const columns: ColumnDef<JobApplication>[] = useMemo(
        () => [
            {
                header: 'Title',
                accessorKey: 'title',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.job.title}</span>
                },
                enableSorting: false,
            },
            {
                header: 'FirstName',
                accessorKey: 'firstName',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.firstName}</span>
                },
                enableSorting: false,
            },
            {
                header: 'LastName',
                enableSorting: false,
                accessorKey: 'lastName',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.lastName}</span>
                },
            },
            {
                header: 'Email',
                enableSorting: false,
                accessorKey: 'email',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.email}</span>
                },
            },
            {
                header: 'Phone',
                enableSorting: false,
                accessorKey: 'phone',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.phone}</span>
                },
            },
            {
                header: 'Specialization',
                enableSorting: false,
                accessorKey: 'specialization',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <span className="capitalize">{row.specialization}</span>
                    )
                },
            },
            {
                header: '',
                id: 'action',
                cell: (props) => <ActionColumn row={props.row.original} />,
            },
        ],
        []
    )
    const navigate = useNavigate()

    const onBack = () => {
        navigate(-1)
    }
    return (
        <>
            {!data?.singleJobApplicationListLoading &&
            data?.singleJobApplicationList.length == 0 ? (
                <Container className="h-full">
                    <div className="h-full flex flex-col items-center justify-center">
                        <DoubleSidedImage
                            src="/img/others/img-2.png"
                            darkModeSrc="/img/others/img-2-dark.png"
                            alt="Access Denied!"
                        />
                        <div className="mt-6 text-center">
                            <h3 className="mb-2">No Job Applications</h3>
                            <p className="text-base capitalize">
                                there is no job applications yet{' '}
                            </p>
                        </div>
                    </div>
                </Container>
            ) : (
                <>
                    <DataTable
                        ref={tableRef}
                        columns={columns}
                        data={data?.singleJobApplicationList}
                        skeletonAvatarColumns={[0]}
                        skeletonAvatarProps={{ className: 'rounded-md' }}
                        loading={data?.singleJobApplicationListLoading}
                    />
                    <StickyFooter
                        className="-mx-8 px-8 flex items-center justify-between py-4"
                        stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                    >
                        <div className="md:flex items-center">
                            <Button
                                size="sm"
                                className="ltr:mr-3 rtl:ml-3"
                                type="button"
                                onClick={() => onBack?.()}
                            >
                                Back
                            </Button>
                        </div>
                    </StickyFooter>
                </>
            )}
        </>
    )
}

export default SingleJobApplicationList
