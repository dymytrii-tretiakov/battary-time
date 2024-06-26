import './App.css'
import { useApp } from './useApp'

function App() {
  const {output, voltContext, watContext, percentage} = useApp();

  return (
    <div className='container'>
      <div className='time'>{output}</div>
      <div className="percentage">{percentage}%</div>
      <label htmlFor="voltage">Заряд акомуляторов (V)</label>
      <input type="number" name='voltage' value={voltContext.value || ''} onChange={voltContext.onChange} max={54} min={44} />
      <label htmlFor="wat">Потребление (W)</label>
      <input type="number" name='wat' value={watContext.value || ''} onChange={watContext.onChange} min={0} max={2500} />
    </div>
  )
}

export default App
