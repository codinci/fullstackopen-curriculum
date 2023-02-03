import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Link, Navigate, useMatch, useNavigate } from 'react-router-dom';
import { initializeUser } from './reducers/loginReducer';
import { initializeUsers } from './reducers/usersReducer';
import { initializeBlogs } from './reducers/blogsReducer';
import { likeBlog, removeBlog } from './reducers/blogsReducer';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import BlogList from './components/BlogList';
import Users from './components/Users';
import Logout from './components/Logout';
import User from './components/User';
import Blog from './components/Blog';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInUser = useSelector((state) => state.authenticatedUser);
  useEffect(() => {
    dispatch(initializeUser()), dispatch(initializeUsers()), dispatch(initializeBlogs());
  }, [dispatch]);

  const users = useSelector((state) => state.users);
  const matchUser = useMatch('/users/:id');
  const user = matchUser ? users.find((u) => u.id === matchUser.params.id) : null;

  const blogs = useSelector((state) => state.blogs);
  const matchBlog = useMatch('/blogs/:id');
  const blog = matchBlog ? blogs.find((b) => b.id === matchBlog.params.id) : null;

  const updateBlog = (blog) => {
    console.log(blog);
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
      navigate('/');
    }
  };

  const padding = {
    padding: 5
  };

  return (
    <div>
      <Notification />
      <div>
        <Link style={padding} to="/">
          Blogs
        </Link>
        <Link style={padding} to="/users">
          Users
        </Link>
        {loggedInUser ? (
          <>
            <em>{loggedInUser.name} logged in</em>
            <Logout />
          </>
        ) : (
          <Link style={padding} to="/login">
            {' '}
            Login
          </Link>
        )}
        <h2>blog app</h2>
      </div>
      <Routes>
        <Route
          path="/"
          element={loggedInUser !== 'null' ? <BlogList /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/blogs/:id"
          element={<Blog blog={blog} handleUpdate={updateBlog} handleDeletion={deleteBlog} />}
        />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User user={user} />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </div>
  );
};

export default App;
