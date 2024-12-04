window.showPrograms = function (day) {
  const programDisplay = document.getElementById("programDisplay");
  programDisplay.innerHTML = ""; // 이전에 표시된 프로그램 초기화

  // 저장된 프로그램 가져오기
  const storedPrograms = JSON.parse(localStorage.getItem("programs")) || {};

  if (storedPrograms[day] && storedPrograms[day].length > 0) {
    storedPrograms[day].forEach((entry, index) => {
      // 프로그램 항목 생성
      const programItem = document.createElement("div");
      programItem.className = "program-item";

      // 텍스트 내용
      const programText = document.createElement("span");
      programText.textContent = entry;

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
};

function deleteProgram(day, index) {
  const storedPrograms = JSON.parse(localStorage.getItem("programs")) || {};

  if (storedPrograms[day]) {
    // 해당 항목 삭제
    storedPrograms[day].splice(index, 1);

    // 로컬 스토리지 업데이트
    localStorage.setItem("programs", JSON.stringify(storedPrograms));

    // 삭제 후 화면 갱신
    showPrograms(day);
  }
}
