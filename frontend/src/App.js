import { StyledContainer } from './components/styled'
import './App.css';
import Tab from './components/Tab'
import StatList from './components/StatList'
import StatusBar from './components/StatusBar'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMetric } from './store/actions'

function App() {
  const currentPeriod = useSelector(state => state.currentPeriod)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchMetric(currentPeriod))
  }, []) // eslint-disable-line
  return (
    <StyledContainer>
      <h3>Main metrics</h3>
      <Tab />
      <StatList />
      <StatusBar />
    </StyledContainer>
  );
}

export default App;
