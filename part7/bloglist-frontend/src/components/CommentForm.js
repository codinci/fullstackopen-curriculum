import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../reducers/blogsReducer';

const CommentForm = ({ blog }) => {
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  const createComment = (event) => {
    event.preventDefault();
    dispatch(addComment(blog.id, comment));
    setComment('');
  };

  return (
    <div>
      <form onSubmit={createComment}>
        <input
          id="comment"
          type="text"
          value={comment}
          name="comment"
          onChange={({ target }) => setComment(target.value)}
        />
        <button id="comment-button" type="submit">
          comment
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
