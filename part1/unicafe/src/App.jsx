import { useState } from 'react'

const Button = ({onClick, text}) => {
  return(
    <button onClick={onClick}>{text}</button>
  )
}

const StatisticLine = ({text, value}) => {
  return (
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  let all = good + bad + neutral
  let average = (good - bad) / all
  let positive = (good / all) * 100

  if(all == 0) {
    return (
      <>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </>
    )
  }
  
  return (
    <>
      <h1>Statistics</h1>
      <table border="0">
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive} />
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  function handleClickGood() {
    setGood(good + 1)
  }

  function handleClickNeutral() {
    setNeutral(neutral + 1)
  }

  function handleClickBad() {
    setBad(bad + 1)
  }

  let all = good + bad + neutral
  let average = (good - bad) / all
  let positive = (good / all) * 100

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={handleClickGood} text="good" />
      <Button onClick={handleClickNeutral} text="neutral" />
      <Button onClick={handleClickBad} text="bad" />
      
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App