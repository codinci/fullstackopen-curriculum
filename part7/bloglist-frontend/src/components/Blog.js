import Comments from './Comments';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Blog = ({ blog, handleUpdate, handleDeletion }) => {
  const user = useSelector((state) => state.authenticatedUser);

  if (!blog) {
    return null;
  }

  if (!user) {
    return null;
  }

  const deleteAccess = {
    display: blog.user.username === user.username ? '' : 'none'
  };

  if (typeof blog.user.username === 'undefined') {
    window.location.reload(false);
  }

  return (
    <Container>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} likes{' '}
        <Button variant="primary" id="like-button" onClick={() => handleUpdate(blog)}>
          like
        </Button>
      </p>
      <p>added by {blog.user.name}</p>
      <Row style={{ marginBottom: 5, marginLeft: 2 }}>
        <Col md={4}>
          {' '}
          <Button
            style={deleteAccess}
            variant="danger"
            id="delete-button"
            onClick={() => handleDeletion(blog)}>
            remove blog
          </Button>
        </Col>
      </Row>
      <Row>
        <Comments blog={blog} />
      </Row>
    </Container>
  );
};

export default Blog;
