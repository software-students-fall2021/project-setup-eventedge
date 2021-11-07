export const getClockTime = () => {
  let today = new Date();
  let hour = today.getHours();
  let minute = today.getMinutes();
  let ap = 'AM';

  if (hour > 11) {
    ap = 'PM';
  }

  if (hour > 12) {
    hour = hour - 12;
  }

  if (hour == 0) {
    hour = 12;
  }

  if (hour < 10) {
    hour = '0' + hour;
  }

  if (minute < 10) {
    minute = '0' + minute;
  }

  let timeString = hour + ':' + minute + ' ' + ap;

  return (
    today.getMonth() +
    1 +
    '/' +
    today.getDate() +
    '/' +
    today.getFullYear() +
    ' ' +
    timeString
  );
};
