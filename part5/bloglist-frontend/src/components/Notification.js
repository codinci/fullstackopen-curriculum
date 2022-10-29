const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
	if (message.type === 'error') {
		return <div className="error">{message.info}</div>;
	}
return <div className="success">{message.info}</div>;
};

export default Notification;
