import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogsReducer';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const dispatch = useDispatch();

  const addBlog = (event) => {
    event.preventDefault();
    const newBlogObject = { title: title, author: author, url: url };
    dispatch(createBlog(newBlogObject));
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <Container>
      <h1>create new</h1>
      <Form onSubmit={addBlog}>
        <Form.Group className="mb-3" controlId="formBasicTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicAuthor">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicUrl">
          <Form.Label>Url</Form.Label>
          <Form.Control
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </Form.Group>
        <Row>
          <Col md={4}>
            {' '}
            <Button id="create-button" type="submit">
              create
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default BlogForm;
