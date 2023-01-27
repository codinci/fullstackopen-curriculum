import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from './reducers/loginReducer';
import { initializeBlogs } from './reducers/blogsReducer';
import { initializeUsers } from './reducers/usersReducer';
import blogService from './services/blogs';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import Toggable from './components/Toggable';
import BlogList from './components/BlogList';
import Users from './components/Users';

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

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser');
    window.location.reload(true);
  };

  return (
    <div>
      <Notification />
      {loggedInUser === null ? (
        <Toggable buttonLabel="login">
          <LoginForm />
        </Toggable>
      ) : (
        <div>
          <h2>blogs</h2>
          <span>{loggedInUser.name} logged in</span>{' '}
          <button id="logout-button" onClick={handleLogout}>
            log out
          </button>
          <BlogList />
          <Users />
        </div>
      )}
    </div>
  );
};

export default App;
