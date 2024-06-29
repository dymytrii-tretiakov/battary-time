import './App.css';
import { useApp } from './useApp';

function App() {
  const { output, voltContext, watContext, percentage } = useApp();

  return (
    <div className="container">
      <div className="time">{output}</div>
      <div className="percentage">{percentage}%</div>
      <label htmlFor="voltage">Заряд акомуляторов (V)</label>
      <input
        inputMode="decimal"
        type="number"
        name="voltage"
        value={voltContext.value || ''}
        onChange={voltContext.onChange}
        enterKeyHint="next"
        max={54}
        min={44}
        onKeyUp={voltContext.keyUp}
      />
      <label htmlFor="wat">Потребление (W)</label>
      <input
        inputMode="decimal"
        type="number"
        name="wat"
        value={watContext.value || ''}
        onChange={watContext.onChange}
        min={0}
        max={2500}
        enterKeyHint='done'
        onKeyUp={watContext.keyUp}
      />
    </div>
  );
}

export default App;
