import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../reducers/loginReducer';

const LoginForm = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    const user = { username: userName, password: password };
    dispatch(userLogin(user));
    navigate('/');
    setUserName('');
    setPassword('');
  };

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          {' '}
          username{' '}
          <input
            id="username"
            type="text"
            value={userName}
            name="Username"
            onChange={({ target }) => setUserName(target.value)}
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
            onChange={({ target }) => setPassword(target.value)}
          />{' '}
        </div>{' '}
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
