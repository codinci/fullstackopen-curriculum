import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializeBlogs } from './reducers/blogsReducer';
import { setNotification } from './reducers/notificationReducer';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import Toggable from './components/Toggable';
import BlogList from './components/BlogList';

const App = () => {
  const [user, setUser] = useState(null);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password
      });

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUserName('');
      setPassword('');
      dispatch(setNotification(`${user.name} logged in`, 5, 'success'));
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, 5, 'error'));
    }
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
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
      {user === null ? (
        <Toggable buttonLabel="login">
          <LoginForm
            username={username}
            password={password}
            handleSubmit={handleLogin}
            handleUserNameEntry={({ target }) => setUserName(target.value)}
            handlePasswordEntry={({ target }) => setPassword(target.value)}
          />
        </Toggable>
      ) : (
        <div>
          <h2>blogs</h2>
          <span>{user.name} logged in</span>{' '}
          <button id="logout-button" onClick={handleLogout}>
            log out
          </button>
          <BlogList user={user} />
        </div>
      )}
    </div>
  );
};

export default App;
