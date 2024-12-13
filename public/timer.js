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
          
          // 클릭 시 프로그램 선택
          programItem.addEventListener("click", function () {
            selectProgram(entry); // 프로그램 선택
          });

          const programText = document.createElement("span");
          programText.textContent = `${entry.exercise} / ${entry.count} / ${entry.setCount} / ${entry.weight} / ${entry.time}`;

          const deleteButton = document.createElement("button");
          deleteButton.textContent = "삭제";
          deleteButton.className = "delete-button";
          deleteButton.onclick = function (e) {
            e.stopPropagation(); // 삭제 버튼 클릭 시 프로그램이 선택되지 않도록 방지
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

  // 모든 프로그램 항목에서 선택된 항목을 강조합니다.
  const programItems = document.querySelectorAll(".program-item");
  programItems.forEach(item => {
    item.style.border = ""; // 기존 강조 제거
    item.classList.remove("completed"); // 완료된 프로그램에서 'completed' 클래스 제거
    // 프로그램 항목에 'data-program-id' 속성을 설정
    item.dataset.programId = program._id; // program._id를 dataset에 설정

    if (item.textContent.includes(program.exercise)) {
      item.style.border = "3px solid #FF6347"; // 선택된 항목에 빨간색 테두리 추가
    }
  });

  // 이전 타이머를 초기화하고, 새로운 프로그램에 대한 타이머를 시작하도록 설정
  clearTimer(); // 타이머를 중지
  currentSet = 0; // 세트 초기화
  totalSeconds = 0; // 시간 초기화
  totalSets = 0; // 세트 수 초기화
  document.getElementById("display").innerText = `세트를 시작하려면 START 버튼을 눌러주세요.`;
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

/// 타이머 카운트
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
      } else {
          clearTimer("모든 세트 완료!");  // 마지막 세트가 끝나면 "모든 세트 완료!" 메시지 출력
      }
  }
}


// 타이머 중지 및 메시지 표시
function clearTimer(message) {
  clearInterval(timer);
  document.getElementById("display").innerText = message;

  // 모든 세트가 완료된 경우, 해당 프로그램 항목에 'completed' 클래스를 추가하여 색상 변경
  if (currentSet === totalSets) {
      markProgramAsCompleted(selectedProgram); // 프로그램 완료 처리
  }
}

// 프로그램 완료 표시
function markProgramAsCompleted(program) {
  const programItems = document.querySelectorAll(".program-item");

  programItems.forEach(item => {
    // 프로그램 항목에 포함된 프로그램의 _id를 이용해서 비교
    if (item.dataset.programId === program._id) {
      item.classList.add("completed"); // 완료된 프로그램에 'completed' 클래스 추가
    }
  });
}

