import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogsReducer';
import { setNotification } from '../reducers/notificationReducer';

const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const dispatch = useDispatch();

  const addBlog = (event) => {
    event.preventDefault();
    const newBlogObject = { title: title, author: author, url: url };
    try {
      dispatch(createBlog(newBlogObject));
      dispatch(
        setNotification(`${newBlogObject.title} by ${newBlogObject.author} added`, 5, 'success')
      );
      setTitle('');
      setAuthor('');
      setUrl('');
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, 5, 'error'));
    }
  };

  return (
    <div>
      <h1>create new</h1>
      <form onSubmit={addBlog}>
        <div>
          {' '}
          Title{' '}
          <input
            id="title"
            type="text"
            value={title}
            name="title"
            placeholder="title"
            onChange={({ target }) => setTitle(target.value)}
          />{' '}
        </div>{' '}
        <div>
          {' '}
          author{' '}
          <input
            id="author"
            type="text"
            value={author}
            name="Author"
            placeholder="author"
            onChange={({ target }) => setAuthor(target.value)}
          />{' '}
        </div>{' '}
        <div>
          {' '}
          Url{' '}
          <input
            id="url"
            type="text"
            value={url}
            name="Url"
            placeholder="url"
            onChange={({ target }) => setUrl(target.value)}
          />{' '}
        </div>{' '}
        <br></br>
        <button id="create-button" type="submit">
          create
        </button>
      </form>
      <br></br>
    </div>
  );
};

export default BlogForm;
