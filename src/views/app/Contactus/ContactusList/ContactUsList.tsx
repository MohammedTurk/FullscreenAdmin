import { injectReducer } from '@/store'
import ContactUsTable from './components/ContactUsTable'
import reducer from './store'

injectReducer('contactUsListSlice', reducer)
const ContactUsList = () => {
    return <ContactUsTable />
}

export default ContactUsList
