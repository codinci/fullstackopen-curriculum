import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLogout } from '../reducers/loginReducer';
const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(userLogout());
    navigate('/login');
  };
  return <button onClick={handleLogout}> logout</button>;
};

export default Logout;
