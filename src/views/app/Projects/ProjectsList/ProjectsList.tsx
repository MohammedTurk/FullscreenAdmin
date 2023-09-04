import { injectReducer } from '@/store'
import reducer from './store'
import ProjectsTable from './components/ProjectsTable'

injectReducer('projectListSlice', reducer)
const ProjectsList = () => {
    return <ProjectsTable />
}

export default ProjectsList
