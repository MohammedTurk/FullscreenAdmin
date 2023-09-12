import { useEffect, useMemo, useRef } from 'react'
import Avatar from '@/components/ui/Avatar'
import DataTable from '@/components/shared/DataTable'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import { FiPackage } from 'react-icons/fi'
import {
    setTableData,
    useAppDispatch,
    useAppSelector,
    getAllArticles,
    setSelectedArticle,
    toggleDeleteConfirmation,
} from '../store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import type {
    DataTableResetHandle,
    ColumnDef,
} from '@/components/shared/DataTable'
import ArticleDeleteConfirmation from './ArticleDeleteConfirmation'
import { TextEllipsis } from '@/components/shared'

type Article = {
    _id: string
    title: string
    content: string
    image: string
    createdAt: string
    updatedAt: string
    tags: string[]
}

const ActionColumn = ({ row }: { row: Article }) => {
    const dispatch = useAppDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onEdit = () => {
        navigate(`/edit-article/${row._id}`)
    }

    const onDelete = () => {
        dispatch(toggleDeleteConfirmation(true))
        dispatch(setSelectedArticle(row._id))
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

const ArticleColumn = ({ row }: { row: Article }) => {
    const avatar = row.image ? (
        <Avatar src={row.image} />
    ) : (
        <Avatar icon={<FiPackage />} />
    )

    return <div className="flex items-center">{avatar}</div>
}

const ArticlesTable = () => {
    const tableRef = useRef<DataTableResetHandle>(null)
    const dispatch = useAppDispatch()
    const data = useAppSelector((state) => state.articlesListSlice.data)

    const { pageIndex, pageSize, total } = useAppSelector(
        (state) => state.articlesListSlice.data.tableData
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
        dispatch(getAllArticles())
    }
    function createMarkup(data: any) {
        return { __html: data }
    }

    const columns: ColumnDef<Article>[] = useMemo(
        () => [
            {
                header: 'Image',
                accessorKey: 'image',
                enableSorting: false,

                cell: (props) => {
                    const row = props.row.original
                    return <ArticleColumn row={row} />
                },
            },
            {
                header: 'Title',
                accessorKey: 'title',
                enableSorting: false,
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.title}</span>
                },
            },
            {
                header: 'Content',
                enableSorting: false,
                accessorKey: 'content',
                cell: (props) => {
                    const row = props.row.original
                    let content = row.content
                    if (content.length > 50) {
                        content = content.substring(0, 50) + ' ...'
                    }
                    const data = createMarkup(content)

                    return (
                        <span
                            className="capitalize"
                            dangerouslySetInnerHTML={data}
                        />
                    )
                },
            },
            {
                header: 'Tags',
                enableSorting: false,
                accessorKey: 'tags',
                cell: (props) => {
                    const row = props.row.original
                    const data = createMarkup(row.tags)
                    return (
                        <span
                            className="capitalize"
                            dangerouslySetInnerHTML={data}
                        />
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
                data={data.articlesList.articles}
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
            <ArticleDeleteConfirmation />
        </>
    )
}

export default ArticlesTable
