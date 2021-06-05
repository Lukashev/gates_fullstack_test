import React from 'react'
import { useSelector } from 'react-redux'
import { statItems } from '../utils/const'
import { StyledStatItem, StyledStatList } from './styled'

const StatList = () => {
  const currentMetric = useSelector(state => state.currentMetric) || {}
  return (
    <StyledStatList>
      {statItems.map(({ key, label}) => {
        const currentKey = currentMetric[key]
        return (
          <StyledStatItem key={key}>
            <div>
              <span />
              <h4>{label}: {currentKey && currentKey !== 'None' ? Number(currentKey).toFixed(2) : Number(0).toFixed(2)} %</h4>
            </div>
            <div>
              Average: 0,11%
            </div>
          </StyledStatItem>
        )
      })}
    </StyledStatList>
  )
}

export default StatList
