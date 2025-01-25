import React, { useState } from 'react';

const TimerApp = () => {
  const [workDuration, setWorkDuration] = useState(10);
  const [breakDuration, setBreakDuration] = useState(1);
  const [time, setTime] = useState(workDuration * breakDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState();

  const handleSetTimer = () => {
    setTime(workDuration * breakDuration * 60);
  };
    const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      const id = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(id);
            setIsRunning(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      setIntervalId(id);
    }
  };

  const stopTimer = () => {
    if (isRunning) {
      setIsRunning(false);
      clearInterval(intervalId);
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    clearInterval(intervalId);
    setTime(workDuration * breakDuration * 60);
  };

  return (
    <div>
      <h1>{formatTime(time)}</h1>
      <h2>Work - Time</h2>
      <div>
        <button onClick={startTimer}>Start</button>
        <button onClick={stopTimer}>Stop</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
      <div>
        <input
          type="number"
          placeholder="Enter work duration"
          value={workDuration}
          onChange={(e) => setWorkDuration(Number(e.target.value))}
        />
        <input
          type="number"
          placeholder="Enter break duration"
          value={breakDuration}
          onChange={(e) => setBreakDuration(Number(e.target.value))}
        />
        <button onClick={handleSetTimer}>Set</button>
      </div>
    </div>
  );
};

export default TimerApp;