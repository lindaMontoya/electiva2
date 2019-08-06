const convertToDate = (unix_timestamp) => {
  var seconds = parseInt(unix_timestamp, 10);

  var days = Math.floor(seconds / (3600 * 24));
  seconds -= days * 3600 * 24;
  var hrs = Math.floor(seconds / 3600);
  seconds -= hrs * 3600;
  var mnts = Math.floor(seconds / 60);
  seconds -= mnts * 60;

  var formattedTime =
    days +
    ' days, ' +
    hrs +
    ' Hrs, ' +
    mnts +
    ' Minutes, ' +
    seconds +
    ' Seconds';

  return formattedTime;
};

export default { convertToDate };
