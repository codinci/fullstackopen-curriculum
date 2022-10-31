import { useState } from "react"

const Blog = ({ blog, updateBlog }) => {
  const [likes, setLikes] = useState(blog.likes)
  const [visible, setVisible] = useState(false);
  const showWhenVisible = { display: visible ? "" : "none" };
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleClick = () => {
    setLikes((prevLikes) => prevLikes + 1)
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      likes: likes + 1,
      url: blog.url,
      user: blog.user[0].id,
    };
    updateBlog(blog.id, updatedBlog)
  }


  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}{" "}<button onClick={({ target }) => setVisible(!visible)}>{visible ? 'hide' : 'view'}</button>
      <div style={showWhenVisible}>
        {blog.url}<br></br>
        Likes {likes}{" "} <button onClick={handleClick}>like</button><br></br>
        {blog.user[0].name} <br></br>
        <button>remove</button>
      </div>
    </div>

  );
}

export default Blog