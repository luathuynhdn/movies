import NotificationContainer from "@components/Notification/Notification";
import { createContext, useState, useEffect } from "react";

export type NotificationType = "info" | "success" | "warning" | "error";

type NotificationOptions = {
  message: string;
  type?: NotificationType;
  duration?: number;
};

type AddNotificationFn = (options: NotificationOptions) => void;

let addNotificationFunction: AddNotificationFn | null = null;

export const setAddNotification = (fn: AddNotificationFn) => {
  addNotificationFunction = fn;
};

export const noti = {
  info: (message: string, duration?: number) =>
    addNotificationFunction?.({ message, type: "info", duration }),
  success: (message: string, duration?: number) =>
    addNotificationFunction?.({ message, type: "success", duration }),
  warning: (message: string, duration?: number) =>
    addNotificationFunction?.({ message, type: "warning", duration }),
  error: (message: string, duration?: number) =>
    addNotificationFunction?.({ message, type: "error", duration }),
};

export interface NotificationModel {
  id: number;
  message: string;
  type?: NotificationType;
  duration?: number;
}

interface ToastContextProps {
  addNotification: (toast: Omit<NotificationModel, "id">) => void;
}

const NotificationContext = createContext<ToastContextProps | undefined>(
  undefined
);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<NotificationModel[]>([]);

  useEffect(() => {
    setAddNotification(addNoti); // register globally
  }, []);

  let notiId = 0;

  const addNoti = (toast: Omit<NotificationModel, "id">) => {
    const newNoti = { ...toast, id: notiId++ };
    setNotifications((prev) => [...prev, newNoti]);

    if (toast.duration !== 0) {
      setTimeout(() => removeToast(newNoti.id), toast.duration ?? 5000);
    }
  };

  const removeToast = (id: number) => {
    setNotifications((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ addNotification: addNoti }}>
      {children}
      <NotificationContainer
        notifications={notifications}
        removeNoti={removeToast}
      />
    </NotificationContext.Provider>
  );
};
