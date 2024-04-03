import { useNotification } from "naive-ui";

const notification = useNotification();
let defaultNotification = {
  title: "New achievement unlocked!",
  content: "View new achievements on achievements page!"
};
export const displayNotification = (notif = defaultNotification) => {
  notification.create({
    title: notif.title,
    description: notif.description,
    duration: 3000,
    content: notif.content
  });
};
