import React from 'react'

const StringCalculator = () => {
  return (
    <div className="container">
      <div className="calculator">
        <h2>String Calculator</h2>
        <input 
          type="text" 
          placeholder="Enter numbers"
        />
        <button >Calculate</button>
      </div>
    </div>
  )
}

export default StringCalculator