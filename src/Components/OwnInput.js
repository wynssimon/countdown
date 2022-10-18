import React, {useEffect, useState} from "react";
import './styles.css';

function getInitialDate() {
    const year = new Date().getFullYear();
  
    return new Date(`01/01/${year + 1}`) 
  }
  
  export default function OwnInput() {
    const [date, setDate] = useState(getInitialDate())
  
    const calculateTimeLeft = () => {
      const difference = +date - +new Date();
  
      let timeLeft = {};
  
      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
  
      return timeLeft;
    };
  
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);
      return () => clearTimeout(timer);
    });
    const timerComponents = [];
  
    Object.keys(timeLeft).forEach((interval) => {
      if (!timeLeft[interval]) {
        return;
      }
  
      timerComponents.push(
        <span>
          {timeLeft[interval]} {interval}{" "}
        </span>
      );
    });
  
    return (
      <div>
        <div className="content">
          <h1>Own Input</h1>
          <input type="date" value={formatDate(date)} onChange={evt => setDate(new Date(evt.target.value))}></input>
          <div class="grid">
            <p>Days: <span>{timeLeft.days}</span></p>
            <p>Hours: <span>{timeLeft.hours}</span></p>
            <p>Minutes: <span>{timeLeft.minutes}</span></p>
            <p>Seconds: <span>{timeLeft.seconds}</span></p>
          </div>
          {/*<p>{timerComponents.length ? timerComponents : <h2>Time's Up!</h2>}</p>*/}
        </div>  
        <img className="achtergrond1" alt="New Year" src={require("../Img/zandloper.jpg")}></img>
      </div>
    );
  }
  
  function formatDate(date) {
    // Formats to yyyy-mm-dd
    return date.getFullYear() + "-" + String(date.getMonth()+1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0")
  }

