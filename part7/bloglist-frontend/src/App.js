import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from './reducers/blogsReducer';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
// import BlogForm from './components/BlogForm';
import Toggable from './components/Toggable';
import { setSuccessNotification, setErrorNotification } from './reducers/notificationReducer';

const App = () => {
  // const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  // const [message, setMessage] = useState(null);

  const blogFormRef = useRef();
  const blogs = useSelector((state) => state.blogs);
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
      dispatch(setSuccessNotification(`${user.name} logged in`, 5));
    } catch (exception) {
      dispatch(setErrorNotification(exception.response.data.error, 5));
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

  // const addBlog = async (blogObject) => {
  //   blogFormRef.current.toggleVisibility();
  //   try {
  //     const newBlog = await blogService.create(blogObject);
  //     const newBlogs = await blogService.getAll();
  //     // setBlogs(newBlogs);
  //     setMessage({
  //       type: 'success',
  //       info: `a new blog ${newBlog.title} by ${newBlog.author} added`
  //     });
  //     setTimeout(() => {
  //       setMessage(null);
  //     }, 5000);
  //   } catch (exception) {
  //     console.log(exception);
  //     setMessage({
  //       type: 'error',
  //       info: `${exception.response.data.error}`
  //     });
  //     setTimeout(() => {
  //       setMessage(null);
  //     }, 5000);
  //   }
  // };

  // const updateBlog = async (id, updatedBlogObject) => {
  //   try {
  //     await blogService.update(id, updatedBlogObject);
  //     // setBlogs(blogs.map((blog) => (blog.id !== id ? blog : { ...blog, likes: blog.likes + 1 })));
  //   } catch (exception) {
  //     setMessage({
  //       type: 'error',
  //       info: `${exception.response.data.error}`
  //     });
  //     setTimeout(() => {
  //       setMessage(null);
  //     }, 5000);
  //   }
  // };

  // const deleteBlog = async (id) => {
  //   try {
  //     await blogService.deleteBlog(id);
  //     // setBlogs(blogs.filter((blog) => blog.id !== id));
  //   } catch (exception) {
  //     setMessage({
  //       type: 'error',
  //       info: `${exception.response.data.error}`
  //     });
  //     setTimeout(() => {
  //       setMessage(null);
  //     }, 5000);
  //   }
  // };

  const sortByLikes = [...blogs].sort((a, b) => b.likes - a.likes);

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
          <Toggable buttonLabel="create new blog" ref={blogFormRef}>
            {/* <BlogForm createBlog={addBlog} /> */}
          </Toggable>
          {sortByLikes.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              // updateBlog={updateBlog}
              // deleteBlog={deleteBlog}
              user={user}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
