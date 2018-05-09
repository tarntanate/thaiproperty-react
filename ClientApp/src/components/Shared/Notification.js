import notification from 'antd/lib/notification';
import { SHOW_MESSAGE_DURATION } from '../../config';

export const openNotification = ({ message, description, type = 'open' }) => {
  notification.config({
    placement: 'bottomRight',
    duration: SHOW_MESSAGE_DURATION,
  });

  notification[type]({
    message: message,
    description: description,
  });
};
