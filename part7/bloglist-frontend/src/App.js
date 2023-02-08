import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Navigate, useMatch, useNavigate } from 'react-router-dom';
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

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';

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

  return (
    <div>
      <Notification />
      <Navbar bg="light" variant="light">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Blog App</Navbar.Brand>
          </LinkContainer>
          <Nav justify variant="tabs">
            <LinkContainer to="/">
              <Nav.Link>Blogs</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/users">
              <Nav.Link>Users</Nav.Link>
            </LinkContainer>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
            {loggedInUser ? (
              <Navbar.Text>
                {loggedInUser.name} logged in <Logout />
              </Navbar.Text>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

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
