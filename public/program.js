window.addEventListener("DOMContentLoaded", function () {
  // 처음에 "요일을 선택해주세요" 메시지를 표시
  const programDisplay = document.getElementById("programDisplay");
  if (programDisplay) {
    programDisplay.textContent = "요일을 선택해주세요";
  }

  const tabs = document.querySelectorAll(".tab");
  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      // 클릭한 탭에 selected 클래스 추가
      tabs.forEach((tab) => tab.classList.remove("selected"));
      this.classList.add("selected");
    });
  });
});

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
window.showPrograms = function (day) {
  const programDisplay = document.getElementById("programDisplay");

  if (!programDisplay) {
    console.error("프로그램 표시 영역을 찾을 수 없습니다.");
    return;
  }

  // 프로그램을 새로 불러오기 전에, 이전 프로그램을 지웁니다.
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

        // 테이블 생성
        const table = document.createElement("table");
        table.style.width = "100%"; // 테이블을 가득 채우도록 설정
        table.style.borderCollapse = "collapse"; // 셀 간 간격을 제거하여 테이블을 깔끔하게

        // 테이블 헤더 추가
        const headerRow = document.createElement("tr");
        const headers = [
          "운동 종류",
          "횟수",
          "세트수",
          "무게",
          "휴식시간",
          "삭제",
        ];
        headers.forEach((header) => {
          const th = document.createElement("th");
          th.style.padding = "10px"; // 패딩 추가
          th.style.border = "1px solid #ddd"; // 테두리 추가
          th.textContent = header;
          headerRow.appendChild(th);
        });
        table.appendChild(headerRow); // 테이블에 헤더 추가

        // 각 운동 항목을 개별 행으로 추가
        dayPrograms.forEach((entry) => {
          const row = document.createElement("tr");

          // 운동 종류
          const exerciseCell = document.createElement("td");
          exerciseCell.textContent = entry.exercise; // 운동 종류
          exerciseCell.style.padding = "8px"; // 패딩 추가
          exerciseCell.style.border = "1px solid #ddd"; // 테두리 추가
          row.appendChild(exerciseCell);

          // 횟수
          const countCell = document.createElement("td");
          countCell.textContent = entry.count; // 횟수
          countCell.style.padding = "8px"; // 패딩 추가
          countCell.style.border = "1px solid #ddd"; // 테두리 추가
          row.appendChild(countCell);

          // 세트수
          const setCountCell = document.createElement("td");
          setCountCell.textContent = entry.setCount; // 세트수
          setCountCell.style.padding = "8px"; // 패딩 추가
          setCountCell.style.border = "1px solid #ddd"; // 테두리 추가
          row.appendChild(setCountCell);

          // 무게
          const weightCell = document.createElement("td");
          weightCell.textContent = entry.weight; // 무게
          weightCell.style.padding = "8px"; // 패딩 추가
          weightCell.style.border = "1px solid #ddd"; // 테두리 추가
          row.appendChild(weightCell);

          // 휴식시간
          const timeCell = document.createElement("td");
          timeCell.textContent = entry.time; // 휴식시간
          timeCell.style.padding = "8px"; // 패딩 추가
          timeCell.style.border = "1px solid #ddd"; // 테두리 추가
          row.appendChild(timeCell);

          // 삭제 버튼
          const deleteButtonCell = document.createElement("td");
          const deleteButton = document.createElement("button");
          deleteButton.textContent = "삭제";
          deleteButton.className = "delete-button";
          deleteButton.onclick = function () {
            deleteProgram(day, entry._id); // 해당 프로그램 ID로 삭제
          };
          deleteButtonCell.appendChild(deleteButton);
          deleteButtonCell.style.padding = "8px"; // 패딩 추가
          deleteButtonCell.style.border = "1px solid #ddd"; // 테두리 추가
          row.appendChild(deleteButtonCell);

          // 행을 테이블에 추가
          table.appendChild(row);
        });

        // 테이블을 화면에 표시
        programDisplay.appendChild(table);
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

// 로컬 스토리지에서 운동 프로그램 데이터를 가져와 표에 표시
window.addEventListener("DOMContentLoaded", function () {
  const programTable = document
    .getElementById("uploadedProgramTable")
    .getElementsByTagName("tbody")[0];
  const program = JSON.parse(localStorage.getItem("currentProgram"));

  if (!program || program.length === 0) {
    alert("업로드된 운동 프로그램이 없습니다.");
    return;
  }

  program.forEach((day) => {
    day.exercises.forEach((exercise) => {
      const row = programTable.insertRow();

      // 요일 열 추가
      const dayCell = row.insertCell();
      dayCell.textContent = day.day;

      // 운동 종류
      const exerciseCell = row.insertCell();
      exerciseCell.textContent = exercise.name;

      // 횟수
      const repsCell = row.insertCell();
      repsCell.textContent = exercise.reps;

      // 세트 수
      const setsCell = row.insertCell();
      setsCell.textContent = exercise.sets;

      // 무게
      const weightCell = row.insertCell();
      weightCell.textContent = exercise.weight;

      // 휴식 시간
      const restCell = row.insertCell();
      restCell.textContent = exercise.rest;
    });
  });
});
