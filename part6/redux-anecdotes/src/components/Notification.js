import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector(state => state.notification)
  // console.log(notification.message)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return <>
    {notification.message === null ?
      <div style={{ display: 'none' }}>
      </div>
      :
      <div style={style}>
        {notification.message}
      </div>
    }
  </>;
}

export default Notification