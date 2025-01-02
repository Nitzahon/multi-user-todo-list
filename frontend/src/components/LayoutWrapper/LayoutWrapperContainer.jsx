import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import LayoutWrapper from './LayoutWrapper'

const LayoutWrapperContainer = ({children}) => {
    const {isAuthenticated} = useSelector((state) => state.auth)

    return (
    <LayoutWrapper isAuthenticated={isAuthenticated}>
        {children}
    </LayoutWrapper>
  )
}

LayoutWrapperContainer.propTypes = {
    children: PropTypes.node
}

export default LayoutWrapperContainer