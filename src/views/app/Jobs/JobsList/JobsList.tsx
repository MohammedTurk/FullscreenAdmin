import Container from '@/components/shared/Container'
import AdaptableCard from '@/components/shared/AdaptableCard'
import reducer from './store'
import { injectReducer } from '@/store'
import Jobs from './components/Jobs'

injectReducer('JobsSlice', reducer)

const JobsList = () => {
    return (
        <Container>
            <AdaptableCard>
                <Jobs />
            </AdaptableCard>
        </Container>
    )
}

export default JobsList
