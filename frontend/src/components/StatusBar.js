import React from 'react'
import { useSelector } from 'react-redux'
import { statusColors, uniqueCodes } from '../utils/const'
import { StyledStatusBar } from './styled'

const StatusBar = () => {
  const { error_list: errorList = [] } = useSelector(state => state.currentMetric || {})
  const serverErrors = errorList.filter(item => uniqueCodes.includes(item.code))
  const otherCodeCount = errorList.reduce((acc, item) => {
    if (!uniqueCodes.includes(item.code)) {
      return acc + +item.count
    }
    return acc
  }, 0)
  const resultList = [...serverErrors, { code: 'default', count: otherCodeCount }]
  const totalCount = resultList.reduce((acc, item) => acc + +item.count, 0)
  return (
    <StyledStatusBar>
      <div className='status--bar'>
        {resultList.map(({ code, count }) => {
          const blockWidth = `${+count / totalCount * 100}%`
          return (
            <div key={code} style={{ backgroundColor: statusColors[code], width: blockWidth }} />
          )
        })}
      </div>
      <div className='status--stats'>
        {resultList.map(({ code, count }) => {
          return (
            <div key={code}>
              <span style={{ backgroundColor: statusColors[code] }} />
              {code !== 'default' ? 'Error ' : 'Other'}
              {code !== 'default' && code}: {count}
            </div>
          )
        })}
      </div>
    </StyledStatusBar>
  )
}

export default StatusBar
