import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'
import { SButton } from '../../styled/SButton'

const SIcon = styled(FontAwesomeIcon)`
    font-size: 1.5rem;
    color: ${({ theme }) => theme.styles.colors.blue_2};
    &.f-sm {
    font-size: ${({ theme }) => theme.styles.text.size.small};
  }

  &.f-md {
    font-size: ${({ theme }) => theme.styles.text.size.medium};
  }

  &.f-lg {
    font-size: ${({ theme }) => theme.styles.text.size.large};
  }
`


const Button = ({buttonText, icon, handleClick, styles}: any) => {
  return (
    <SButton className={styles ? styles : ""} onClick={handleClick}>{buttonText && buttonText} {icon && <SIcon className={styles} icon={icon}/>}</SButton>
  )
}

export default Button