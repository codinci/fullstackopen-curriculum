import Comments from './Comments';
import { useSelector } from 'react-redux';

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
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} likes{' '}
        <button id="like-button" onClick={() => handleUpdate(blog)}>
          like
        </button>
      </p>
      <p>added by {blog.user.name}</p>
      <div style={deleteAccess}>
        <button
          id="delete-button"
          style={{ backgroundColor: 'blue' }}
          onClick={() => handleDeletion(blog)}>
          remove
        </button>
      </div>
      <Comments blog={blog} />
    </div>
  );
};

export default Blog;
