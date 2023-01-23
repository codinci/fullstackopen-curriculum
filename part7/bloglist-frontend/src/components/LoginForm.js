import PropTypes from 'prop-types';

const LoginForm = ({
  handleSubmit,
  username,
  handleUserNameEntry,
  password,
  handlePasswordEntry
}) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          {' '}
          username{' '}
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={handleUserNameEntry}
          />{' '}
        </div>{' '}
        <div>
          {' '}
          password{' '}
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordEntry}
          />{' '}
        </div>{' '}
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUserNameEntry: PropTypes.func.isRequired,
  handlePasswordEntry: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
};

export default LoginForm;
