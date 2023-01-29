import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Link, Navigate, useMatch } from 'react-router-dom';
import { setUser } from './reducers/loginReducer';
import { initializeBlogs } from './reducers/blogsReducer';
import { initializeUsers } from './reducers/usersReducer';
import blogService from './services/blogs';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import BlogList from './components/BlogList';
import Users from './components/Users';
import Logout from './components/Logout';
import User from './components/User';

const App = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.authenticatedUser);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  const users = useSelector((state) => state.users);
  const matchUser = useMatch('/users/:id');
  const user = matchUser ? users.find((u) => u.id === matchUser.params.id) : null;

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
        <Route path="/" element={loggedInUser ? <BlogList /> : <Navigate replace to="/login" />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User user={user} />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </div>
  );
};

export default App;
