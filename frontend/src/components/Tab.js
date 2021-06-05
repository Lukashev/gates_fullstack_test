import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMetric } from '../store/actions'
import { tabItems } from '../utils/const'
import { StyledTab, StyledTabList } from './styled'
import classnames from 'classnames'

const Tab = () => {
  const { currentPeriod } = useSelector(state => state)
  const dispatch = useDispatch()

  const handleTabClick = metricId => {
    dispatch(fetchMetric(metricId))
  }

  return (
    <StyledTabList>
      {tabItems.map(({ id, label }) => (
        <StyledTab
          key={id}
          onClick={() => handleTabClick(id)}
          className={classnames({ active: currentPeriod === id })}
        >
          {label}
        </StyledTab>
      ))}
    </StyledTabList>
  )
}

export default Tab