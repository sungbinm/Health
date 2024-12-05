document.addEventListener("DOMContentLoaded", function () {
  // 폼 요소 가져오기
  const programForm = document.getElementById("programForm");

  // 폼이 존재하는지 확인
  if (programForm) {
    // 폼에 submit 이벤트 리스너 추가
    programForm.addEventListener("submit", function (e) {
      e.preventDefault(); // 폼 제출 방지

      // 프로그램 데이터 가져오기
      const programData = {
        day: document.getElementById("day").value,
        exercise: document.getElementById("exercise").value,
        count: document.getElementById("count").value,
        setCount: document.getElementById("set_count").value,
        weight: document.getElementById("weight").value,
        time: document.getElementById("time").value,
      };

      // 유효성 검사
      if (
        !programData.day ||
        !programData.exercise ||
        !programData.count ||
        !programData.setCount ||
        !programData.weight ||
        !programData.time
      ) {
        alert("모든 필드를 채워주세요.");
        return;
      }

      // 서버에 데이터 전송
      fetch("http://localhost:3000/save-program", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(programData),
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("서버 응답:", data);
          if (data.success) {
            window.location.href = "program.html"; // 성공 시 프로그램 페이지로 이동
          } else {
            alert(data.message); // 오류 메시지 표시
          }
        })
        .catch((error) => {
          console.error("프로그램 저장 실패:", error);
        });
    });
  } else {
    console.error("프로그램 폼을 찾을 수 없습니다.");
  }
});
