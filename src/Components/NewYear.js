import React, {useEffect, useState} from "react";
import './styles.css';

export default function NewYear() {
  const [countDownTarget, setCountDownTarget] = useState(
    new Date("01/01/2022")
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
    <div>
      <div className="content">
        <h1>New Year Countdown</h1>
        <div class="grid">
          <p>Days: <span>{countDownTime.days}</span></p>
          <p>Hours: <span>{countDownTime.hours}</span></p>
          <p>Minutes: <span>{countDownTime.minutes}</span></p>
          <p>Seconds: <span>{countDownTime.seconds}</span></p>
        </div>
        {showMessage && <h2>Happy New Year</h2>}
      </div>
      <img className="achtergrond1" alt="New Year" src={require("../Img/nieuwjaar.jpg")}></img>
    </div>
  );
}
