import { useEffect, useState } from 'react'
import './App.css'

// Format seconds into 'HH:MM:SS' format
const formatTime = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

function App() {
  const [timerSet, setTimerSet] = useState<boolean>(false);
  const [displayTime, setDisplayTime] = useState<string>("");

  useEffect(() => {
    chrome.runtime.sendMessage(
      { cmd: "GET_TIME" },
      response => {
        if (response && response.timeLeft) {
          setTimerSet(true);
          setDisplayTime(formatTime(response.timeLeft));
        }
      }
    );

    const interval = setInterval(() => {
      chrome.runtime.sendMessage(
        { cmd: "GET_TIME" },
        response => {
          if (response && response.timeLeft) {
            setDisplayTime(formatTime(response.timeLeft));
          } else {
            setTimerSet(false);
          }
        }
      );
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card">
      {
        !timerSet &&
        <div>
          <label>Sleep in...</label>
          <input type="text" id="sleepTime" ></input>
          <input
            type="button"
            onClick={() => {
              const formValue = (
                document.getElementById("sleepTime") as HTMLInputElement
              ).value;
              if (!formValue) {
                return
              }

              const timeSet = parseInt(formValue) * 60;
              chrome.runtime.sendMessage(
                { cmd: "START_TIMER", timeSet: timeSet }
              );
              setDisplayTime(formatTime(timeSet))
              setTimerSet(true);
            }}
            value="Start"
          ></input>
        </div>
      }
      {
        timerSet &&
        <div>
          <h3>{displayTime}</h3>
          <input
            type="button"
            onClick={() => {
              setTimerSet(false);
              setDisplayTime(formatTime(0));
              chrome.runtime.sendMessage({ cmd: "STOP_TIMER" });
            }}
            value="Reset"
          ></input>
        </div>
      }
    </div>
  )
}

export default App
