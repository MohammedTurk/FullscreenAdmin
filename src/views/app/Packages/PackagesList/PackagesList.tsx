import Container from '@/components/shared/Container'
import AdaptableCard from '@/components/shared/AdaptableCard'
import reducer from './store'
import { injectReducer } from '@/store'
import Packages from './components/Packages'

injectReducer('PackagesListSlice', reducer)

const PackagesList = () => {
    return (
        <Container>
            <AdaptableCard>
                <Packages />
            </AdaptableCard>
        </Container>
    )
}

export default PackagesList
