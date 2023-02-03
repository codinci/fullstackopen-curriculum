import { useRef } from 'react';
import { useSelector } from 'react-redux';
import BlogForm from './BlogForm';
import Toggable from './Toggable';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);
  const sortByLikes = blogs.slice().sort((a, b) => b.likes - a.likes);
  const blogFormRef = useRef();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  return (
    <div>
      <Toggable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm />
      </Toggable>
      {sortByLikes.map((blog) => (
        <div className="blog" style={blogStyle} key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
