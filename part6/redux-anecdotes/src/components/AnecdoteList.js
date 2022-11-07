import { anecdoteVote } from "../reducers/anecdoteReducer";
import { useDispatch, useSelector } from "react-redux";

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
  const anecdotes = useSelector((state) =>
    state.sort((a, b) => b.votes - a.votes)
  );
  return (
    <div>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => dispatch(anecdoteVote(anecdote.id))}
        />
      ))}
    </div>
  );
};

export default AnecdoteList;
