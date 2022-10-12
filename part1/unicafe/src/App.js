import { useState } from "react";

const Statistics = ({ good, neutral, bad, total, average, positive }) => {
  return (
    <div>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={total} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={positive} />
    </div>
  );
};

const Feedback = (props) => {
  return (
    <div>
      <button onClick={props.reviews[0]}>good</button>
      <button onClick={props.reviews[1]}>neutral</button>
      <button onClick={props.reviews[2]}>bad</button>
    </div>
  );
}

const StatisticLine = (props) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th style={{ textAlign: "left" }}></th>
            <th style={{ textAlign: "right" }}></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ textAlign: "left", width:"70px" }}>{props.text}</td>
            <td style={{ textAlign: "left" }}>{props.value}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const goodReview = () => {
    setGood(good => good + 1);
  }
  const neutralReview = () => {
    setNeutral(neutral => neutral + 1);
  }
  const badReview = () => {
    setBad(bad => bad + 1);
  }

  const total = good + bad + neutral;
  const average = Math.round((good * 1 + bad * -1 + neutral * 0) / total) / 10;
  const positive = parseFloat(((good/total) * 100).toFixed(1));
  const positivePercentage = `${positive} %`;


  return (
    <div>
      <h3>give feedback</h3>
      <Feedback reviews={[goodReview, neutralReview, badReview ]} />
      <h3>statistics</h3>
      {
        (total > 0) ?
          <Statistics
            good={good}
            bad={bad}
            neutral={neutral}
            total={total}
            average={average}
            positive={positivePercentage}
          />
        :
          <p>No feedback given</p>
      }
    </div>
  );
};

export default App;