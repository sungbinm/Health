window.addEventListener("DOMContentLoaded", function () {
  // 처음에 월요일 프로그램을 보여줍니다.
  window.showPrograms("MON");
});

window.showPrograms = function (day) {
  const programDisplay = document.getElementById("programDisplay");

  if (!programDisplay) {
    console.error("프로그램 표시 영역을 찾을 수 없습니다.");
    return;
  }

  programDisplay.innerHTML = ""; // 이전에 표시된 프로그램 초기화

  fetch("/get-programs", {
    method: "GET",
    credentials: "include", // 세션 쿠키를 포함하여 요청
  })
=======
<<<<<<< Updated upstream
=======

  console.log("Fetching programs...");
  // 서버에서 프로그램 데이터 가져오기
>>>>>>> Stashed changes
  fetch("/get-programs")
>>>>>>> Stashed changes
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


function updateMuscleActivations(day, exercise, setCount) {
  // 서버에서 muscleActivations와 totalMuscleActivations을 갱신
  fetch('/update-muscle-activations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ day, exercise, setCount })
  })
  .then(response => response.json())
  .then(data => {
    if (!data.success) {
      alert("근육 활성화 데이터 업데이트 실패.");
    }
  })
  .catch(error => {
    console.error("Error updating muscle activations:", error);
    alert("활성화 데이터 업데이트 중 오류 발생.");
  });
}