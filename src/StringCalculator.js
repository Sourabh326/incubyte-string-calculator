import React, {useState} from 'react'

const StringCalculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const add = (numbers) => {
    if (!numbers) return 0;

    let delimiter = /,|\n/;
    if (numbers.startsWith('//')) {
      const delimiterEndIndex = numbers.indexOf('\n');
      const delimiterString = numbers.substring(2, delimiterEndIndex);
      const delimiters = delimiterString.match(/\[(.*?)\]/g);

      if (delimiters) {
        delimiter = new RegExp(delimiters.map(d => d.slice(1, -1)).join('|'));
      } else {
        delimiter = new RegExp(delimiterString);
      }

      numbers = numbers.substring(delimiterEndIndex + 1);
    }

    const nums = numbers.split(delimiter).map(Number);
    const negatives = nums.filter(num => num < 0);
    if (negatives.length) {
      throw new Error(`Negatives not allowed: ${negatives.join(', ')}`);
    }

    return nums.filter(num => num <= 1000).reduce((sum, num) => sum + num, 0);
  };
  
  const handleCalculate = () => {
    try {
      setError(null);
      setResult(add(input));
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