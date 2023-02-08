import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLogout } from '../reducers/loginReducer';
import Button from 'react-bootstrap/Button';
const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(userLogout());
    navigate('/login');
  };
  return (
    <Button variant="secondary" onClick={handleLogout}>
      {' '}
      logout
    </Button>
  );
};

export default Logout;
