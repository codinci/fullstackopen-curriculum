import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState(null);

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

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogUser");
  };

  const addBlog = async (event) => {
    event.preventDefault();
    try {
      const blogObject = {
        title: title,
        author: author,
        url: url,
      };
      const newBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(newBlog));
      setTitle("");
      setAuthor("");
      setUrl("");
      setMessage({
        type: "success",
        info: `a new blog ${newBlog.title} by ${newBlog.author} added`,
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
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  return (
    <div>
      <Notification message={message} />
      {user === null ? (
        <div>
          <h2>Log in to application</h2>
          <form onSubmit={handleLogin}>
            <div>
              {" "}
              username{" "}
              <input
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUserName(target.value)}
              />{" "}
            </div>{" "}
            <div>
              {" "}
              password{" "}
              <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
              />{" "}
            </div>{" "}
            <button type="submit">login</button>
          </form>
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <span>{user.name} logged in</span>{" "}
          <button onClick={handleLogout}>log out</button>
          <div>
            <h1>create new</h1>
            <form onSubmit={addBlog}>
              <div>
                {" "}
                Title{" "}
                <input
                  type="text"
                  value={title}
                  name="title"
                  onChange={({ target }) => setTitle(target.value)}
                />{" "}
              </div>{" "}
              <div>
                {" "}
                author{" "}
                <input
                  type="tesxt"
                  value={author}
                  name="Author"
                  onChange={({ target }) => setAuthor(target.value)}
                />{" "}
              </div>{" "}
              <div>
                {" "}
                Url{" "}
                <input
                  type="text"
                  value={url}
                  name="Url"
                  onChange={({ target }) => setUrl(target.value)}
                />{" "}
              </div>{" "}
              <br></br>
              <button type="submit">create</button>
            </form>
            <br></br>
          </div>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
