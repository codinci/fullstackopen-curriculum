import { useRef } from 'react';
import Toggable from './Toggable';
import CommentForm from './CommentForm';

const Comments = ({ blog }) => {
  const commentFormRef = useRef();
  return (
    <div>
      <Toggable buttonLabel="comment" ref={commentFormRef}>
        <CommentForm blog={blog} />
      </Toggable>
      <h3> Comments</h3>
      {blog.comments.length > 0 ? (
        <ul>
          {blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default Comments;
