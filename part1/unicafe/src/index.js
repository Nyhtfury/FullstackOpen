import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistic = ({text, value, unit, isTableRow}) => {
  if (isTableRow) {
    return (
      <>
        <tr>
          <td>
            {text}
          </td>
          <td>
            {value} {unit}
          </td>
        </tr>
      </>
    )
  }

  return (
    <>
      {text} {value} {unit}
    </>
  )
}

const Statistics = ({good, neutral, bad, isTable}) => {
  if ((good + neutral + bad) === 0) {
    return (
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    )
  }
  
  if (isTable) {
    return (
      <>
        <h1>statistics</h1>
        <table> 
          <tbody>
            <Statistic text="good" value={good} isTableRow={true}/>
            <Statistic text="neutral" value={neutral} isTableRow={true}/>
            <Statistic text="bad" value={bad} isTableRow={true}/>
            <Statistic text="all" value={good + neutral + bad} isTableRow={true}/>
            <Statistic text="average" value={(good * 1 + bad * -1)/(good + neutral + bad)} isTableRow={true}/>
            <Statistic text="positive" value={(good / (good + neutral + bad)) * 100} unit="%" isTableRow={true}/>
          </tbody>
        </table>
      </>
    )
  }
  
  return (
    <>
      <h1>statistics</h1>
      <Statistic text="good" value={good}/><br/>
      <Statistic text="neutral" value={neutral}/><br/>
      <Statistic text="bad" value={bad}/><br/>
      <Statistic text="all" value={good + neutral + bad}/><br/>
      <Statistic text="average" value={(good * 1 + bad * -1)/(good + neutral + bad)}/><br/>
      <Statistic text="positive" value={(good / (good + neutral + bad)) * 100} unit="%"/><br/>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good"/>
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral"/>
      <Button handleClick={() => setBad(bad + 1)} text="bad"/>
      <Statistics good={good} neutral={neutral} bad={bad} isTable={true}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)