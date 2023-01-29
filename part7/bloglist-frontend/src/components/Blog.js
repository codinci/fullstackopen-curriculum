import { useState } from 'react';
import { useSelector } from 'react-redux';

const Blog = ({ blog, handleUpdate, handleDeletion }) => {
  const [visible, setVisible] = useState(false);
  const user = useSelector((state) => state.authenticatedUser);
  const showWhenVisible = { display: visible ? '' : 'none' };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  if (user === null) {
    return null;
  }
  const deleteAccess = {
    display: blog.user.username === user.username ? '' : 'none'
  };

  return (
    <div className="blog" style={blogStyle}>
      <span>{blog.title}</span> <span>{blog.author}</span>{' '}
      <button id="view-button" onClick={() => setVisible(!visible)}>
        {visible ? 'hide' : 'view'}
      </button>
      <div style={showWhenVisible}>
        <p style={showWhenVisible}>{blog.url}</p>
        <div style={showWhenVisible}>
          Likes {blog.likes}
          <button id="like-button" onClick={handleUpdate}>
            like
          </button>
        </div>
        <p style={showWhenVisible}> {blog.user.name}</p>
        <div style={deleteAccess}>
          <button id="delete-button" style={{ backgroundColor: 'blue' }} onClick={handleDeletion}>
            remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
