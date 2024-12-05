window.showPrograms = function (day) {
  const programDisplay = document.getElementById("programDisplay");
  programDisplay.innerHTML = ""; // 이전에 표시된 프로그램 초기화

  // 서버에서 프로그램 데이터 가져오기
  fetch("/get-programs")
    .then((response) => response.json())
    .then((storedPrograms) => {
      if (storedPrograms[day] && storedPrograms[day].length > 0) {
        storedPrograms[day].forEach((entry, index) => {
          // 프로그램 항목 생성
          const programItem = document.createElement("div");
          programItem.className = "program-item";

          // 텍스트 내용
          const programText = document.createElement("span");
          programText.textContent = `${entry.exercise} / ${entry.count} / ${entry.setCount} / ${entry.weight} / ${entry.time}`;

          // 삭제 버튼 생성
          const deleteButton = document.createElement("button");
          deleteButton.textContent = "삭제";
          deleteButton.className = "delete-button";
          deleteButton.onclick = function () {
            deleteProgram(day, index);
          };

          // 항목에 텍스트와 버튼 추가
          programItem.appendChild(programText);
          programItem.appendChild(deleteButton);

          // 화면에 항목 추가
          programDisplay.appendChild(programItem);
        });
      } else {
        programDisplay.textContent = "프로그램이 없습니다."; // 프로그램이 없을 경우 메시지
      }

      // 모든 탭에서 선택된 상태 제거
      const tabs = document.querySelectorAll(".tab");
      tabs.forEach((tab) => tab.classList.remove("selected"));

      // 현재 클릭된 탭에 선택 상태 추가
      const selectedTab = document.getElementById(day);
      selectedTab.classList.add("selected");
    })
    .catch((error) => {
      console.error("Error fetching programs:", error);
      programDisplay.textContent = "프로그램 로드 중 오류 발생.";
    });
};

function deleteProgram(day, index) {
  // 서버에 삭제 요청
  fetch(`/delete-program`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ day, index }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // 삭제 성공 후 화면 갱신
        showPrograms(day);
      } else {
        alert("프로그램 삭제에 실패했습니다.");
      }
    })
    .catch((error) => {
      console.error("Error deleting program:", error);
      alert("삭제 중 오류 발생.");
    });
}
