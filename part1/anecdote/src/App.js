import { useState } from "react";

const HighestVote = ({text, tally}) => {
  return (
    <div>
      <h2>Anecdote with most votes</h2>
      <p>{text()}</p>
      <p>has { tally } votes</p>
    </div>
  );
}

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];

  const anecdoteLength = anecdotes.length;

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(() => Array(anecdoteLength).fill(0));

  const generateRandomNumber = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
  }

  const handleRandomAnecdoteClick = () => {
    setSelected(generateRandomNumber(0, anecdoteLength));
  }

  const handleVoteClick = () => {
    const copy = [...votes];
    copy[selected]++;

    setVotes(copy);
  }

  const mostVotes = () => {
    const mostVotedAnecdoteIndex = votes.indexOf(Math.max(...votes));
    return anecdotes[mostVotedAnecdoteIndex];
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={handleVoteClick}>Vote</button>
      <button onClick={handleRandomAnecdoteClick}>Next anecdote</button>
      <HighestVote text={mostVotes} tally= {Math.max(...votes)} />
    </div>
  );
}

export default App;
