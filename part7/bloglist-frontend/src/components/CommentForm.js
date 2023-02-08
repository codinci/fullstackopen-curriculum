import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../reducers/blogsReducer';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const CommentForm = ({ blog }) => {
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  const createComment = (event) => {
    event.preventDefault();
    dispatch(addComment(blog.id, comment));
    setComment('');
  };

  return (
    <Container>
      <Form onSubmit={createComment}>
        <Form.Group className="mb-3" controlId="formBasicUrl">
          <Form.Label>Comment</Form.Label>
          <Form.Control
            type="text"
            value={comment}
            name="Comment"
            onChange={({ target }) => setComment(target.value)}
          />
        </Form.Group>
        <Button variant="primary" id="comment-button" type="submit">
          comment
        </Button>
      </Form>
    </Container>
  );
};

export default CommentForm;
