let totalSeconds;
let timer;

function startTimer() {
    totalSeconds = parseInt(document.querySelector("#startSec").value) || 0;

    if (totalSeconds > 0) {
        timer = setInterval(countTimer, 1000);
    }
}

function countTimer() {
    if (totalSeconds > 0) {
        totalSeconds--;
        const seconds = totalSeconds;
        document.querySelector("#display").innerText =
            "휴식시간 : " + seconds + " 초";
    } else {
        clearTimer(timer, "타이머 종료");
    }
}

function clearTimer(t, text) {
    clearInterval(t);
    document.getElementById("display").innerText = text;
    document.getElementById("startSec").value = "";
}
