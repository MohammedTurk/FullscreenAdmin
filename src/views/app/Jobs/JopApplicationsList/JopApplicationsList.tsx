import { injectReducer } from '@/store'
import reducer from './store'
import AllJobApplicationsTable from './components/AllJobApplicationsTable'

injectReducer('JopApplicationListSlice', reducer)
const JopApplicationsList = () => {
    return <AllJobApplicationsTable />
}

export default JopApplicationsList
