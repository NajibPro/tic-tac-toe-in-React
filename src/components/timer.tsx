import React, { useState, useEffect } from 'react';
import './timer.css';

const Timer = () => {
  const [time, setTime] = useState({ minutes: 0, seconds: 0 });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevTime) => {
        const newSeconds = prevTime.seconds + 1;
        const newMinutes = prevTime.minutes + Math.floor(newSeconds / 60);
        const updatedSeconds = newSeconds % 60;

        return { minutes: newMinutes, seconds: updatedSeconds };
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formattedTime = `${time.minutes.toString().padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}`;

  return <div className='timer'>{formattedTime}</div>;
};

export default Timer;
