import { useState } from 'react';

const Blog = ({ blog, user, handleUpdate }) => {
  const [visible, setVisible] = useState(false);
  const showWhenVisible = { display: visible ? '' : 'none' };
  const deleteAccess = {
    display: blog.user.username === user.username ? '' : 'none'
  };
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  // const handleDelete = () => {
  //   if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
  //     deleteBlog(blog.id);
  //   }
  // };

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
          <button id="delete-button" style={{ backgroundColor: 'blue' }}>
            remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
