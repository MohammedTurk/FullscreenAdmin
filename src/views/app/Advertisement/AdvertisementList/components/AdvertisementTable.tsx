import { useEffect, useMemo, useRef } from 'react'
import Avatar from '@/components/ui/Avatar'
import DataTable from '@/components/shared/DataTable'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import { FiPackage } from 'react-icons/fi'
import {
    setTableData,
    useAppDispatch,
    useAppSelector,
    toggleDeleteConfirmation,
    setSelectedAdvertisement,
    getAllAdvertisements,
} from '../store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import type {
    DataTableResetHandle,
    ColumnDef,
} from '@/components/shared/DataTable'
import dayjs from 'dayjs'
import AdvertisementDeleteConfirmation from './AdvertisementDeleteConfirmation'

type Advertisement = {
    _id: string
    type: string
    isClosed: string
    image: string
    createdAt: string
    updatedAt: string
    relatedId: string
}
const ActionColumn = ({ row }: { row: Advertisement }) => {
    const dispatch = useAppDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onEdit = () => {
        console.log(row)

        navigate(`/edit-advertisement/${row._id}`)
    }

    const onDelete = () => {
        dispatch(toggleDeleteConfirmation(true))
        dispatch(setSelectedAdvertisement(row._id))
    }

    return (
        <div className="flex justify-end text-lg">
            <span
                className={`cursor-pointer p-2 hover:${textTheme}`}
                onClick={onEdit}
            >
                <HiOutlinePencil />
            </span>
            <span
                className="cursor-pointer p-2 hover:text-red-500"
                onClick={onDelete}
            >
                <HiOutlineTrash />
            </span>
        </div>
    )
}

const AdvertisementColumn = ({ row }: { row: Advertisement }) => {
    const avatar = row.image ? (
        <Avatar src={row.image} />
    ) : (
        <Avatar icon={<FiPackage />} />
    )

    return <div className="flex items-center">{avatar}</div>
}

const AdvertisementTable = () => {
    const tableRef = useRef<DataTableResetHandle>(null)
    const dispatch = useAppDispatch()
    const data = useAppSelector((state) => state.AdvertisementListSlice.data)
    console.log(data.advertisementList)

    const { pageIndex, pageSize, total } = useAppSelector(
        (state) => state.AdvertisementListSlice.data.tableData
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
        dispatch(getAllAdvertisements())
    }

    const columns: ColumnDef<Advertisement>[] = useMemo(
        () => [
            {
                header: 'Image',
                accessorKey: 'image',
                enableSorting: false,

                cell: (props) => {
                    const row = props.row.original
                    return <AdvertisementColumn row={row} />
                },
            },
            {
                header: 'Type',
                accessorKey: 'type',
                enableSorting: false,
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.type}</span>
                },
            },

            {
                header: ' Closed',
                enableSorting: false,
                accessorKey: 'isClosed',
                cell: (props) => {
                    const row = props.row.original
                    console.log('row', row.isClosed)

                    return (
                        <span className="capitalize">
                            {row.isClosed.toString()}
                        </span>
                    )
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
                data={data.advertisementList}
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
            <AdvertisementDeleteConfirmation />
        </>
    )
}

export default AdvertisementTable
