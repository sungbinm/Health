let selectedProgram = null;
let totalSeconds;
let timer;
let currentSet = 0;
let totalSets = 0;

window.addEventListener("DOMContentLoaded", function () {
  // 처음에 "요일을 선택해주세요" 메시지를 표시
  const programDisplay = document.getElementById("programDisplay");
  if (programDisplay) {
    programDisplay.textContent = "요일을 선택해주세요";
  }


  const tabs = document.querySelectorAll(".tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", function() {
      // 클릭한 탭에 selected 클래스 추가
      tabs.forEach(tab => tab.classList.remove("selected"));
      this.classList.add("selected");
    });
  });

    // START 버튼 클릭 시 타이머 시작
    document.getElementById("startButton").addEventListener("click", startProgramFromButton);

});


// 프로그램을 로드하고 표시하는 함수
  window.showPrograms = function (day) {
    const programDisplay = document.getElementById("programDisplay");
  
    if (!programDisplay) {
      console.error("프로그램 표시 영역을 찾을 수 없습니다.");
      return;
    }
  
    // 프로그램을 새로 불러오기 전에, innerHTML을 초기화하여 이전 프로그램을 지웁니다.
    programDisplay.innerHTML = ""; 
  
    fetch("/get-programs", {
      method: "GET",
      credentials: "include", // 세션 쿠키를 포함하여 요청
    })
      .then((response) => response.json())
      .then((storedPrograms) => {
        console.log("받은 프로그램:", storedPrograms); // 응답 확인
  
        if (
          storedPrograms &&
          storedPrograms[day] &&
          storedPrograms[day].length > 0
        ) {
          const dayPrograms = storedPrograms[day];
  
          dayPrograms.forEach((entry) => {
            const programItem = document.createElement("div");
            programItem.className = "program-item";
  
            const programText = document.createElement("span");
            programText.textContent = `${entry.exercise} / ${entry.count} / ${entry.setCount} / ${entry.weight} / ${entry.time}`;
  
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "삭제";
            deleteButton.className = "delete-button";
            deleteButton.onclick = function () {
              deleteProgram(day, entry._id);
            };
  
            programItem.appendChild(programText);
            programItem.appendChild(deleteButton);
  
            programDisplay.appendChild(programItem);
          });
        } else {
          programDisplay.textContent = "해당 요일에 프로그램이 없습니다.";
        }
      })
      .catch((error) => {
        console.error("프로그램 로드 중 오류 발생:", error);
        programDisplay.textContent = "프로그램 로드 중 오류 발생.";
      });
  };
  
  function deleteProgram(day, programId) {
    fetch(`/delete-program`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ programId }), // day를 보낼 필요 없으므로 삭제
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          showPrograms(day); // 프로그램 삭제 후 해당 요일의 프로그램을 다시 로드
        } else {
          alert("프로그램 삭제 실패");
        }
      })
      .catch((error) => {
        console.error("프로그램 삭제 중 오류 발생:", error);
        alert("삭제 중 오류 발생.");
      });
  }
  

// 선택된 프로그램을 타이머에 연결하는 함수
function selectProgram(program) {
  selectedProgram = program;
  document.getElementById("display").textContent =
    `선택된 프로그램: ${program.exercise} - 세트 ${program.setCount}, 휴식 ${program.time}초`;
}

// START 버튼 클릭 시 프로그램 시작
function startProgramFromButton() {
  if (!selectedProgram) {
      alert("먼저 프로그램을 선택하세요!");
      return;
  }

  // 첫 번째 세트가 시작되었으면, 다음 세트를 진행하도록 설정
  if (currentSet === 0) {
      startProgramTimer(selectedProgram.time, selectedProgram.setCount);
  } else {
      startNextSet(); // 세트가 진행 중일 때는 다음 세트 시작
  }
}

// 선택된 프로그램에 대해 타이머 시작
function startProgramTimer(restTime, setCount) {
  totalSets = setCount;
  currentSet = 1; // 첫 번째 세트 시작
  if (restTime > 0 && totalSets > 0) {
      totalSeconds = restTime;
      document.getElementById("display").innerText =
          `세트 ${currentSet}/${totalSets} 시작. 휴식: ${totalSeconds}초`;
      timer = setInterval(countTimer, 1000); // 첫 번째 세트 시작
  } else {
      alert("유효한 휴식 시간과 세트 수를 설정하세요.");
  }
}

// 다음 세트 시작
function startNextSet() {
  if (currentSet < totalSets) {
      currentSet++; // 세트 번호 증가
      document.getElementById("display").innerText =
          `세트 ${currentSet}/${totalSets} 시작. 휴식: ${totalSeconds}초`;

      totalSeconds = selectedProgram.time; // 다음 세트를 위한 시간 초기화
      timer = setInterval(countTimer, 1000); // 타이머 시작
  } else {
      clearTimer("모든 세트 완료!");
  }
}

// 타이머 카운트
function countTimer() {
    if (totalSeconds > 0) {
        totalSeconds--;
        document.getElementById("display").innerText =
            `세트 ${currentSet}/${totalSets} 진행 중. 남은 휴식: ${totalSeconds}초`;
    } else {
        clearInterval(timer); // 타이머 종료
        if (currentSet < totalSets) {
            document.getElementById("display").innerText =
                `세트 ${currentSet} 휴식 완료. 다음 세트 휴식을 하려면 START 버튼을 누르세요.`;
        }
    }
}

// 타이머 중지 및 메시지 표시
function clearTimer(message) {
    clearInterval(timer);
    document.getElementById("display").innerText = message;
}
