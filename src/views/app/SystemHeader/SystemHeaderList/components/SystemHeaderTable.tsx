import { useEffect, useMemo, useRef } from 'react'
import DataTable from '@/components/shared/DataTable'
import {
    setTableData,
    useAppDispatch,
    useAppSelector,
    getAllHeaders,
    toggleDeleteConfirmation,
    setSelectedService,
} from '../store'
import cloneDeep from 'lodash/cloneDeep'
import type {
    DataTableResetHandle,
    ColumnDef,
} from '@/components/shared/DataTable'
import dayjs from 'dayjs'
import { FiPackage } from 'react-icons/fi'
import { Avatar } from '@/components/ui'
import { HiOutlineTrash } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import SystemHeaderDeleteConfirmation from './SystemHeaderDeleteConfirmation'

type system = {
    _id: string
    image: string
    type: string
    title: string
    content: string
    createdAt: string
    updatedAt: string
}

const SystemHeaderTable = () => {
    const tableRef = useRef<DataTableResetHandle>(null)
    const dispatch = useAppDispatch()
    const data = useAppSelector((state) => state.systemHeaderListSlice.data)
    const { pageIndex, pageSize, total } = useAppSelector(
        (state) => state.systemHeaderListSlice.data.tableData
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
        dispatch(getAllHeaders())
    }
    function createMarkup(data: any) {
        return { __html: data }
    }

    const HeaderColumn = ({ row }: { row: system }) => {
        const avatar = row.image ? (
            <Avatar src={row.image} />
        ) : (
            <Avatar icon={<FiPackage />} />
        )

        let title = row.title
        if (title.length > 70) {
            title = title.substring(0, 50) + ' ...'
        }
        const data = createMarkup(title)
        return (
            <div className="flex items-center">
                {avatar}

                <span
                    className={`ml-2 rtl:mr-2 font-semibold capitalize`}
                    dangerouslySetInnerHTML={data}
                />
            </div>
        )
    }

    const ActionColumn = ({ row }: { row: system }) => {
        const dispatch = useAppDispatch()

        const onDelete = () => {
            dispatch(toggleDeleteConfirmation(true))
            dispatch(setSelectedService(row._id))
        }

        return (
            <div className="flex justify-end text-lg">
                <span
                    className="cursor-pointer p-2 hover:text-red-500"
                    onClick={onDelete}
                >
                    <HiOutlineTrash />
                </span>
            </div>
        )
    }

    const columns: ColumnDef<system>[] = useMemo(
        () => [
            {
                header: 'Title',
                enableSorting: false,
                accessorKey: 'title',
                cell: (props) => {
                    const row = props.row.original
                    return <HeaderColumn row={row} />
                },
            },
            {
                header: 'Content',
                enableSorting: false,
                accessorKey: 'content',
                cell: (props) => {
                    const row = props.row.original

                    let content = row.content
                    if (content.length > 70) {
                        content = content.substring(0, 50) + ' ...'
                    }
                    const data = createMarkup(content)
                    return (
                        <span
                            className={` capitalize`}
                            dangerouslySetInnerHTML={data}
                        />
                    )
                },
            },
            {
                header: 'Type',
                enableSorting: false,
                accessorKey: 'type',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.type}</span>
                },
            },
            {
                header: 'Created At',
                enableSorting: false,
                accessorKey: 'message',
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
                data={data.headersList}
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
            <SystemHeaderDeleteConfirmation />
        </>
    )
}

export default SystemHeaderTable
