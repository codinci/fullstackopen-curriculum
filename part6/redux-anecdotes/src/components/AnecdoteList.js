import { connect } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

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

const AnecdoteList = (props) => {
  const sortedAnecdotes = props.anecdotes.slice().sort((a, b) => b.votes - a.votes);
  const updateVote = (anecdote) => {
    props.voteAnecdote(anecdote);
    props.setNotification(`You voted for ${anecdote.content}`, 10);
  };
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter)),
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  setNotification,
}
const ConnectedAnecdotes = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdotes;
