const NotificationBanner = ({header, message, type}) => {
  return (
    <div className={`NotificationBanner NotificationBanner--${type}`}>
      <h3 className="NotificationBanner__header">{header}</h3>
      <p className="NotificationBanner__message">{message}</p>
    </div>
  );
};

export default NotificationBanner;
