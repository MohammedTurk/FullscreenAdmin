import { useEffect, useMemo, useRef } from 'react'
import DataTable from '@/components/shared/DataTable'
import {
    setTableData,
    useAppDispatch,
    useAppSelector,
    getAllRequests,
} from '../store'
import cloneDeep from 'lodash/cloneDeep'
import type {
    DataTableResetHandle,
    ColumnDef,
} from '@/components/shared/DataTable'
import dayjs from 'dayjs'

type contactUs = {
    _id: string
    fullName: string
    subject: string
    email: string
    message: string
    createdAt: string
    updatedAt: string
}

const ContactUsTable = () => {
    const tableRef = useRef<DataTableResetHandle>(null)
    const dispatch = useAppDispatch()
    const data = useAppSelector((state) => state.contactUsListSlice.data)
    const { pageIndex, pageSize, total } = useAppSelector(
        (state) => state.contactUsListSlice.data.tableData
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
        dispatch(getAllRequests())
    }

    const columns: ColumnDef<contactUs>[] = useMemo(
        () => [
            {
                header: 'Full Name',
                enableSorting: false,
                accessorKey: 'fullName',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.fullName}</span>
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
                header: 'Subject',
                enableSorting: false,
                accessorKey: 'subject',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.subject}</span>
                },
            },
            {
                header: 'Message',
                enableSorting: false,
                accessorKey: 'message',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.message}</span>
                },
            },
            {
                header: 'Created At',
                enableSorting: false,
                accessorKey: 'createdAt',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <span className="capitalize">
                            {dayjs(row.createdAt).format('DD MMM')}
                        </span>
                    )
                },
            },
            {
                header: 'Updated At',
                enableSorting: false,
                accessorKey: 'updatedAt',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <span className="capitalize">
                            {dayjs(row.updatedAt).format('DD MMM')}
                        </span>
                    )
                },
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
                data={data.contactUsList}
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

export default ContactUsTable
