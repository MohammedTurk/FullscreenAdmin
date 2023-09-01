import { injectReducer } from '@/store'
import ArticlesTable from './components/ArticlesTable'
import reducer from './store'

injectReducer('articlesListSlice', reducer)
const ServicesList = () => {
    return <ArticlesTable />
}

export default ServicesList
