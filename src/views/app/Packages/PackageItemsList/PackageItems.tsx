import { injectReducer } from '@/store'
import reducer from './store'
import PackageItemsTable from './components/PackageItemsTable'

injectReducer('PackageSlice', reducer)
const PackageItems = () => {
    return <PackageItemsTable />
}

export default PackageItems
