const buttonStart = document.querySelector('#start');
const buttonReset = document.querySelector('#reset');
const pomodoroTime = document.querySelector('#pomodoro-time');
const buttonPomodoro = document.querySelector('#pomodoro');
const buttonBreak = document.querySelector('#break');
let timerId;
let isStarted = false;
let isPomodoro = true;

function stopTimer() {
    clearInterval(timerId);
    isStarted = false;
    buttonStart.textContent = "Start";
};

buttonStart.addEventListener('click', function() {
    
    const str = pomodoroTime.textContent.split(":");
    const minutes = parseInt(str[0]);
    const remainingSeconds = parseInt(str[1]);
    let time = minutes * 60 + remainingSeconds;

    if (isStarted) {
        stopTimer();
        return;
    };

    timerId = setInterval(() => {
        time--;
        const newMinutes = Math.floor(time / 60);
        const newSeconds = time % 60;
        pomodoroTime.textContent = `${String(newMinutes).padStart(2, "0")}:${String(newSeconds).padStart(2, "0")}`;

        if(time <= 0) {
            stopTimer();
            pomodoroTime.textContent = "25:00";
        }

}, 10);

    isStarted = true;
    buttonStart.textContent = "Stop";

});

function updateTime() {
    if (isPomodoro) {
        pomodoroTime.textContent = "25:00"; 
    } else {
        pomodoroTime.textContent = "05:00"; 
    };
};

buttonPomodoro.addEventListener('click', function() {
    buttonPomodoro.classList.add('active');
    buttonBreak.classList.remove('active');
    isPomodoro = true; 
    stopTimer();
    updateTime();
});

buttonBreak.addEventListener('click', function() {
    buttonBreak.classList.add('active');
    buttonPomodoro.classList.remove('active');
    isPomodoro = false; 
    stopTimer();
    updateTime();
});

buttonReset.addEventListener('click', function() {
    stopTimer();
    updateTime() 
});    


