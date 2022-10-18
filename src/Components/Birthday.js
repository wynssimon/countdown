import React, {useEffect, useState} from "react";
import './styles.css';

export default function Birthday() {
  const [countDownTarget, setCountDownTarget] = useState(
    new Date("10/17/2022")
  );

  const [showMessage, setShowMessage] = useState(
    isToday(countDownTarget.getTime() - new Date().getTime())
  );

  const [countDownTime, setCountDownTime] = useState(
    getReturnValues(countDownTarget.getTime() - new Date().getTime())
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const countDownTime = countDownTarget.getTime() - new Date().getTime();

      if (countDownTime <= 0) {
        setCountDownTarget(
          new Date(
            countDownTarget.setFullYear(countDownTarget.getFullYear() + 1)
          )
        );
      }

      if (
        isToday(countDownTime) ||
        isToday(
          new Date(countDownTarget).setFullYear(
            countDownTarget.getFullYear() - 1
          ) - new Date().getTime()
        )
      ) {
        setShowMessage(true);
      } else {
        setShowMessage(false);
      }

      setCountDownTime(getReturnValues(countDownTime));
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownTarget]);

  function isToday(time) {
    return time <= 0 && time >= -86400000;
  }

  function getReturnValues(countDown) {
    const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

    return {
      days: days >= 0 ? days : 0,
      hours: hours >= 0 ? hours : 0,
      minutes: minutes >= 0 ? minutes : 0,
      seconds: seconds >= 0 ? seconds : 0
    };
  }

  return (
    <div className="App">
      <div className="content">
        <h1>Birthday Countdown</h1>
        <p>Days: {countDownTime.days}</p>
        <p>Hours: {countDownTime.hours}</p>
        <p>Minutes: {countDownTime.minutes}</p>
        <p>Seconds: {countDownTime.seconds}</p>
        {showMessage && <h2>Happy Birthday</h2>}
      </div>
      <img className="achtergrond1" alt="New Year" src={require("../Img/birthday.jpg")}></img>
      <div className="cover"></div>

    </div>
  );
};