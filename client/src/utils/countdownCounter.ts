const monthDay = (year: number) => {
  const returnArr = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  //Handle Leap Year
  if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
    returnArr[2] = 29;
  }

  return returnArr;
};

//Zero Prpender Function
export const Z = (num: number) => {
  if (num < 0) return "00";

  let stringifiedNum = num.toString();
  if (stringifiedNum.length == 1) {
    stringifiedNum = "0" + stringifiedNum;
  }
  return stringifiedNum;
};

const CountdownCounter = (targetDate: Date) => {
  const currentDate = new Date();
  const diffMs = targetDate.valueOf() - currentDate.valueOf();
  const totalSeconds = Math.max(0, Math.floor(diffMs / 1000));

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    days: Z(days),
    hours: Z(hours),
    minutes: Z(minutes),
    seconds: Z(seconds),
  };
};

export default CountdownCounter;
