import Container from '@/components/shared/Container'
import AdaptableCard from '@/components/shared/AdaptableCard'
import reducer from './store'
import { injectReducer } from '@/store'
import Testimonials from './components/Testimonials'

injectReducer('testimonialsSlice', reducer)

const TestimonialsList = () => {
    return (
        <Container>
            <AdaptableCard>
                <Testimonials />
            </AdaptableCard>
        </Container>
    )
}

export default TestimonialsList
