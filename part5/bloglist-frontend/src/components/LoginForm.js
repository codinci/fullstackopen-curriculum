import PropTypes from 'prop-types'

const LoginForm = ({
  handleSubmit,
  username,
  handleUserNameChange,
  password,
  handlePasswordChange,
}) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          {' '}
          username{' '}
          <input
            type="text"
            value={username}
            name="Username"
            onChange={handleUserNameChange}
          />{' '}
        </div>{' '}

        <div>
          {' '}
          password{' '}
          <input
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
          />{' '}
        </div>{' '}
        <button type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUserNameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm
