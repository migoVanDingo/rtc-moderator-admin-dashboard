import styled from "styled-components";
import { SFlexCol, SFlexRow } from "./SFlexContainer";

export const SGenericPageContainer = styled(SFlexCol)`
    padding: ${({ theme }) => theme.styles.container.padding.md};
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
`

export const SFormContainer = styled(SFlexCol)`
    width: 100%;
    align-self: flex-start;
`

export const SWideContainer = styled(SFlexRow)`
    width: 100%;
    `
    