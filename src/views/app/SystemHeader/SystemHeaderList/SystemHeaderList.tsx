import { injectReducer } from '@/store'
import SystemHeaderTable from './components/SystemHeaderTable'
import reducer from './store'

injectReducer('systemHeaderListSlice', reducer)
const SystemHeaderList = () => {
    return <SystemHeaderTable />
}

export default SystemHeaderList
