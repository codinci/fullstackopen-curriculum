const Notification = ({ status }) => {
	if (status === null) {
    return null;
  } else {
    return (
      <>
        {status.type === "success" ? (
          <div className="success__message">
            <p>{status.message}</p>
          </div>
        ) : (
          <div className="error__message">
            <p>{status.message}</p>
          </div>
        )}
      </>
    );
  }


};

export default Notification;
