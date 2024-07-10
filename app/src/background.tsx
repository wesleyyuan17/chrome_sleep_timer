let secondsLeft: number;
let interval: NodeJS.Timeout;
let timeOut: NodeJS.Timeout;

const stopStream = () => {
  const pause = () => {
    // HBO
    const buttons = document.getElementsByTagName("button");
    for (var i = 0; i < buttons.length; i++) {
      if (buttons.item(i)?.ariaLabel?.toLowerCase() === "play") {
        (buttons.item(i) as HTMLElement).click();
        return;
      }
    }

    // Hulu
    const button = document.getElementsByClassName("PauseButton");
    if (button.length == 1) {
      (button[0] as HTMLElement).click();
      return;
    }

    // Netflix and Youtube
    const videos = document.getElementsByTagName("video");
    if (videos.length == 1) {
      videos[0].pause();
      return;
    }
  }

  chrome.tabs.query(
    { audible: true, currentWindow: true },
    (tabs) => {
      tabs.forEach((tab) => {
        if (!tab.id) {
          return
        }
        chrome.scripting.executeScript({
          target: {tabId: tab.id},
          func: pause
        })
      })
  });
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.cmd === "START_TIMER") {
    secondsLeft = request.timeSet;
    interval = setInterval(() => secondsLeft -= 1, 1000);
    timeOut = setTimeout(() => {
      clearInterval(interval);
      stopStream();
    }, request.timeSet * 1000);
  } else if (request.cmd === "GET_TIME") {
    if (interval && secondsLeft >= 0) {
      sendResponse({ timeLeft: secondsLeft });
    } else {
      sendResponse({ timeLeft: null });
    }
  } else if (request.cmd == "STOP_TIMER") {
    clearInterval(interval);
    clearTimeout(timeOut);
    secondsLeft = -1;
  }
});
