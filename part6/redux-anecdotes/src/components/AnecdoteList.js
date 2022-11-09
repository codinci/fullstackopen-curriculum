import { voteAnecdote } from "../reducers/anecdoteReducer";
import { useDispatch, useSelector } from "react-redux";
import {  setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </>
  );
};

const AnecdoteList = () => {

  const dispatch = useDispatch();
  const anecdotes = useSelector(({ filter, anecdotes }) =>
    anecdotes.filter(anecdote =>
      anecdote.content.includes(filter))
  )

  const sortedAnecdotes = anecdotes.slice().sort((a, b) => b.votes - a.votes)
  const updateVote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(`You voted for ${anecdote.content}`, 10));
  }
  return (
    <div>
      {sortedAnecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => updateVote(anecdote)}
        />
      ))}
    </div>
  );
};

export default AnecdoteList;
