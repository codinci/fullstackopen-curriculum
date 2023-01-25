import Blog from './Blog';
import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { likeBlog, removeBlog } from '../reducers/blogsReducer';
import BlogForm from './BlogForm';
import Toggable from './Toggable';

const BlogList = ({ user }) => {
  const blogs = useSelector((state) => state.blogs);
  const sortByLikes = blogs.slice().sort((a, b) => b.likes - a.likes);
  const dispatch = useDispatch();
  const blogFormRef = useRef();

  const updateBlog = (blog) => {
    const updatedBlog = {
      author: blog.author,
      title: blog.title,
      id: blog.id,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
    };
    dispatch(likeBlog(updatedBlog));
  };

  const deleteBlog = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog.id));
    }
  };

  return (
    <div>
      <Toggable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm />
      </Toggable>
      {sortByLikes.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          handleUpdate={() => updateBlog(blog)}
          handleDeletion={() => deleteBlog(blog)}
        />
      ))}
    </div>
  );
};

export default BlogList;
