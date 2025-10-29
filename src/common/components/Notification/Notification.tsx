import React from "react";

import "./notification.scss";

import type { NotificationModel } from "@providers/NotificationProvider";

interface Props {
  notifications: NotificationModel[];
  removeNoti: (id: number) => void;
}

const NotificationContainer: React.FC<Props> = ({
  notifications,
  removeNoti,
}) => {
  return (
    <div className="notification-container">
      {notifications.map((noti) => (
        <div
          key={noti.id}
          className={`notification ${noti.type ?? "info"}`}
          onClick={() => removeNoti(noti.id)}
        >
          {noti.message}
        </div>
      ))}
    </div>
  );
};

export default NotificationContainer;
