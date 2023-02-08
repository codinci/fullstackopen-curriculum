import Container from 'react-bootstrap/Container';

const User = ({ user }) => {
  if (!user) {
    return null;
  }
  const sortByLikes = user.blogs.slice().sort((a, b) => b.likes - a.likes);

  return (
    <Container>
      <h2>{user.name}</h2>
      {user.blogs.length > 0 ? (
        <>
          <h4>added blogs</h4>
          <ul>
            {sortByLikes.map((blog) => (
              <li key={blog.id}>{blog.title}</li>
            ))}
          </ul>
        </>
      ) : (
        <p>User has no blogs at the moment.</p>
      )}
    </Container>
  );
};

export default User;
