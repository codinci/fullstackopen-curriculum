import { createSlice } from "@reduxjs/toolkit"

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    anecdoteVote(state, action) {
      const id = action.payload
      const anecdoteAddVote = state.find((a) => a.id === id);
      const votedAnecdote = {
        ...anecdoteAddVote,
        votes: anecdoteAddVote.votes + 1,
      };
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : votedAnecdote
      );
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }

})


export const {createAnecdote, anecdoteVote, setAnecdotes} = anecdoteSlice.actions
export default anecdoteSlice.reducer;