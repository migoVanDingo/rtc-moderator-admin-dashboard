import styled from "styled-components"

export const SButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 45px;
  color: ${({ theme }) => theme.styles.colors.grey_9};
  font-size: ${({ theme }) => theme.styles.text.size.large};
  background-color: ${({ theme }) => theme.styles.colors.grey_15};
  border-radius: ${({ theme }) => theme.styles.container.borderRadius.small};
  border: 1px solid ${({ theme }) => theme.styles.colors.grey_11};
  box-shadow: 0px 2px 3px ${({ theme }) => theme.styles.colors.grey_12};
  cursor: pointer;  

  &:hover {
    background-color: ${({ theme }) => theme.styles.colors.grey_13};
  }

  &.confirm {
    background-color: ${({ theme }) => theme.styles.colors.blue_2};
    color: ${({ theme }) => theme.styles.colors.grey_15};

    &:hover {
      background-color: ${({ theme }) => theme.styles.colors.blue_3};
    }
  }



  &:active {
    border: 1px solid ${({ theme }) => theme.styles.colors.blue_2};
    color: ${({ theme }) => theme.styles.colors.blue_2};
  }

  &.push-right {
    margin-left: auto;
  }

  &.f-sm {
    font-size: ${({ theme }) => theme.styles.text.size.small};
  }

  &.f-md {
    font-size: ${({ theme }) => theme.styles.text.size.medium};
  }

  &.f-lg {
    font-size: ${({ theme }) => theme.styles.text.size.large};
  }


  &.f-weight-400 {
    font-weight: 400;
  }

  &.f-weight-200 {
    font-weight: 200;
  }

  &.f-weight-100 {
    font-weight: 100;
  }


  &.h-xs {
    height: 30px;
  }

  &.h-sm {
    height: 45px;
  }

  &.h-md {
    height: 60px;
  }

  &.h-lg {
    height: 80px;
  }

  &.h-xl {
    height: 100px;
  }

  

  &.w-xs {
    width: 60px;
  }

  &.w-md {
    width: 100px;
  }

  &.w-lg {
    width: 150px;
  }

  &.w-xl {
    width: 200px;
  }

  &.w-full {
    width: 100%;
  }

  &.w-auto {
    width: auto;
  }


`
