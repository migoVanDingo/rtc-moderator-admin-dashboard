import styled from 'styled-components'
import Button from '../common/functional/input/Button'
import Heading from '../common/functional/text/Heading'
import { SFlexRow } from '../common/styled/SFlexContainer'

const SContainer = styled(SFlexRow)`
    width: 100%;
    height: 70px;
    align-items: center;

    padding: ${({ theme }) => theme.styles.container.padding.small} ;
    border-bottom: 1px solid ${({ theme }) => theme.styles.colors.grey_10};
    background-color: ${({ theme }) => theme.styles.colors.grey_15};
    box-shadow: 0 2px 3px ${({ theme }) => theme.styles.colors.grey_11};
        
    `

const ModuleHeader = ({heading, headingStyles, buttonText, icon, buttonStyles, containerStyles, handleClick}: any) => {
  return (
    <SContainer className={containerStyles}>
        <Heading heading={heading} styles={headingStyles}/>

        { buttonText || icon ? <Button handleClick={handleClick} styles={buttonStyles} buttonText={buttonText} icon={icon}/> : null }
    </SContainer>
  )
}

export default ModuleHeader