import { message } from 'antd';

/** 성공알림 알림 */
export const Alert = (alert) => {
  message.info({
    content: alert,
    style: {
      width: '100%',
      position: 'absolute',
      top: '5rem',
      color: 'rgb(27, 122, 255)'
    },
    duration: 2.5,
    });
};
