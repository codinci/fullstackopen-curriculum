import { useSelector } from 'react-redux';
import Alert from 'react-bootstrap/Alert';

const Notification = () => {
  const notifications = useSelector((state) => state.notifications);

  if (notifications === null) {
    return null;
  }
  if (notifications.type === 'error') {
    return (
      <Alert key="danger" variant="danger">
        {notifications.message}
      </Alert>
    );
  }
  return (
    <Alert key="success" variant="success">
      {notifications.message}
    </Alert>
  );
};

export default Notification;
