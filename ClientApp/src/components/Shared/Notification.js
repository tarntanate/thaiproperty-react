import notification from 'antd/lib/notification';
import {
    SHOW_MESSAGE_DURATION
} from '../../config';

export const openNotification = ({
    message,
    description,
    type = 'open',
    duration = SHOW_MESSAGE_DURATION
}) => {
    notification.config({
        placement: 'bottomRight',

        duration,
    });

    notification[type]({
        message: message,
        description: description,
    });
};