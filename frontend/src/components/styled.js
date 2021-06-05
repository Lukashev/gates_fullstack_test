import styled from 'styled-components'

export const StyledContainer = styled.div`
  width: 100%;
  max-width: 748px;
  background-color: #FFFFFF;
  box-shadow: 0 1px 5px rgba(0,0,0,.15);
  border-radius: 10px;
  padding: 40px;
  padding-right: 100px;
  margin: 100px auto;
  h3 {
    font-size: 22px;
    line-height: 28px;
    color: #4A4A4A;
  }
`

export const StyledTabList = styled.div`
  display: flex;
`

export const StyledTab = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #FFFFFF;
  border: 1px solid #D9D9D9;
  color: #4A4A4A;
  width: 104px;
  height: 32px;
  transition: all .5s ease;
  &:hover {
    cursor: pointer;
  }
  &.active {
    color: #FFFFFF;
    background-color: #2196F3;
  }
  &:first-child {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
  &:last-child {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`

export const StyledStatList = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 44px;
`

export const StyledStatItem = styled.div`
  diplay: flex;
  flex-direction: column;
  & div {
    &:first-child {
      display: flex;
      align-items: center;
    }
    & span {
      background: #8BC34A;
      border: 2px solid #FFFFFF;
      width: 10px;
      height: 10px;
      border-radius: 100%;
      margin-right: 8px;
    }
    & h4 {
      font-size: 16px;
      line-height: 28px;
      color: #4A4A4A;
      margin: 0;
    }
    &:last-child {
      font-size: 12px;
      line-height: 16px;
      color: #A0B0B9;
      margin-top: 5px;
    }
  }
`

export const StyledStatusBar = styled.div`
  font-weight: 600px;
  font-size: 14px;
  line-height: 16px
  color: #4A4A4A;
  .status--stats {
    display: flex;
    margin-top: 24px;
    & div {
      margin-right: 30px;
    }
  }
  .status--bar {
    display: flex;
    margin-top: 15px;
    div {
      height: 8px;
    }
  }
  & span {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 2px;
    margin-right: 5px;
  }
`