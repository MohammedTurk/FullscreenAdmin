import { injectReducer } from '@/store'
import ServicesTable from './components/ServicesTable'
import reducer from './store'

injectReducer('serviceListSlice', reducer)
const ServicesList = () => {
    return <ServicesTable />
}

export default ServicesList
