import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h1>create new</h1>
      <form onSubmit={addBlog}>
        <div>
          {' '}
          Title{' '}
          <input
            type="text"
            value={title}
            name="title"
            placeholder='title'
            onChange={({ target }) => setTitle(target.value)}
          />{' '}
        </div>{' '}
        <div>
          {' '}
          author{' '}
          <input
            type="tesxt"
            value={author}
            name="Author"
            placeholder='author'
            onChange={({ target }) => setAuthor(target.value)}
          />{' '}
        </div>{' '}
        <div>
          {' '}
          Url{' '}
          <input
            type="text"
            value={url}
            name="Url"
            placeholder='url'
            onChange={({ target }) => setUrl(target.value)}
          />{' '}
        </div>{' '}
        <br></br>
        <button type="submit">create</button>
      </form>
      <br></br>
    </div>
  )
}

export default BlogForm
