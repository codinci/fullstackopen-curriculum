import { useSelector } from 'react-redux';

const Notification = () => {
  const notifications = useSelector((state) => state.notifications);

  if (notifications === null) {
    return null;
  }
  if (notifications.type === 'error') {
    return <div className="error">{notifications.message}</div>;
  }
  return <div className="success">{notifications.message}</div>;
};

export default Notification;
