import React, {useState} from 'react'

const StringCalculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCalculate = () => {
    try {
      setError(null);
      setResult();
    } catch (e) {
      setError(e.message);
      setResult(null);
    }
  };

  return (
    <div className="container">
      <div className="calculator">
        <h2>String Calculator</h2>
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Enter numbers"
        />
        <button onClick={handleCalculate}>Calculate</button>
        {error && <p className="error">Error: {error}</p>}
        {result !== null && <p>Result: {result}</p>}
      </div>
    </div>
  )
}

export default StringCalculator