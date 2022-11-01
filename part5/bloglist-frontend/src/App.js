import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Toggable from "./components/Toggable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    };
    fetchData().catch(console.error);
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUserName("");
      setPassword("");
      setMessage({
        type: "success",
        info: `${user.username} logged in`,
      });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (exception) {
      setMessage({
        type: "error",
        info: `${exception.response.data.error}`,
      });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

   useEffect(() => {
     const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
     if (loggedUserJSON) {
       const user = JSON.parse(loggedUserJSON);
       setUser(user);
       blogService.setToken(user.token);
     }
   }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogUser");
    window.location.reload(true);
  };

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    try {
      const newBlog = await blogService.create(blogObject);
      const newBlogs = await blogService.getAll();
      setBlogs(newBlogs);
      setMessage({
        type: "success",
        info: `a new blog ${newBlog.title} by ${newBlog.author} added`,
      });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (exception) {
      console.log(exception);
      setMessage({
        type: "error",
        info: `${exception.response.data.error}`,
      });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const updateBlog = async (id, updatedBlogObject) => {
    try {
      await blogService.update(id, updatedBlogObject);
      const updatedBlogs = await blogService.getAll()
      setBlogs(updatedBlogs)
    } catch (exception) {
      setMessage({
        type: "error",
        info: `${exception.response.data.error}`,
      });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  }

  const deleteBlog = async (id) => {
      console.log(user.token);

    try {
        await blogService.deleteBlog(id)
        setBlogs(blogs.filter(blog => blog.id !== id))
    } catch (exception) {
       setMessage({
        type: "error",
        info: `${exception.response.data.error}`,
      });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  }




  const sortByLikes = [...blogs].sort((a, b) => b.likes - a.likes);


  return (
    <div>
      <Notification message={message} />
      {user === null ? (
        <Toggable buttonLabel="login">
          <LoginForm
            username={username}
            password={password}
            handleSubmit={handleLogin}
            handleUserNameChange={({ target }) => setUserName(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
          />
        </Toggable>
      ) : (
        <div>
          <h2>blogs</h2>
          <span>{user.name} logged in</span>{" "}
          <button onClick={handleLogout}>log out</button>
          <Toggable buttonLabel='create new blog' ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Toggable>
          {sortByLikes.map((blog) => (
            <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
