import Blog from './Blog';
import { useSelector, useDispatch } from 'react-redux';
import { likeBlog } from '../reducers/blogsReducer';

const BlogList = ({ user }) => {
  const blogs = useSelector((state) => state.blogs);
  const sortByLikes = blogs.slice().sort((a, b) => b.likes - a.likes);
  const dispatch = useDispatch();

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

  return (
    <div>
      {sortByLikes.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} handleUpdate={() => updateBlog(blog)} />
      ))}
    </div>
  );
};

export default BlogList;
