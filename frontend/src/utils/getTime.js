// converts the time to format 0:00
const getTime = (time) => `${Math.floor(time / 60)}:${`0${Math.floor(time % 60)}`.slice(-2)}`;

export default getTime;
