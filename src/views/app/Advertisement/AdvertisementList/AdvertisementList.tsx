import { injectReducer } from '@/store'
import AdvertisementTable from './components/AdvertisementTable'
import reducer from './store'

injectReducer('AdvertisementListSlice', reducer)
const AdvertisementList = () => {
    return <AdvertisementTable />
}

export default AdvertisementList
