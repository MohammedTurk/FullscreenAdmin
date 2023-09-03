import { useEffect, useMemo, useRef } from 'react'
import DataTable from '@/components/shared/DataTable'
import { HiEye, HiOutlineTrash, HiOutlineViewList } from 'react-icons/hi'
import {
    setTableData,
    useAppDispatch,
    useAppSelector,
    setSelectedJobApplication,
    toggleDeleteConfirmation,
    getAllJopApplications,
} from '../store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import type {
    DataTableResetHandle,
    ColumnDef,
} from '@/components/shared/DataTable'
import { StickyFooter } from '@/components/shared'
import { Button } from '@/components/ui'

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
        navigate(`/view-job-Application/${row.job._id}`)
    }

    const onDelete = () => {
        dispatch(toggleDeleteConfirmation(true))
        dispatch(setSelectedJobApplication(row._id))
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

const AllJobApplicationsTable = () => {
    const tableRef = useRef<DataTableResetHandle>(null)
    const dispatch = useAppDispatch()
    const data = useAppSelector((state) => state.JopApplicationListSlice.data)

    const { pageIndex, pageSize, total } = useAppSelector(
        (state) => state.JopApplicationListSlice.data.tableData
    )

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, pageSize])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, total }),
        [pageIndex, pageSize, total]
    )

    const fetchData = () => {
        dispatch(getAllJopApplications())
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

    const onPaginationChange = (page: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        dispatch(setTableData(newTableData))
    }

    const onSelectChange = (value: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        dispatch(setTableData(newTableData))
    }

    return (
        <>
            <DataTable
                ref={tableRef}
                columns={columns}
                data={data.jobApplicationsList}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ className: 'rounded-md' }}
                loading={data.loading}
                pagingData={{
                    total: tableData.total as number,
                    pageIndex: tableData.pageIndex as number,
                    pageSize: tableData.pageSize as number,
                }}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
            />
        </>
    )
}

export default AllJobApplicationsTable
