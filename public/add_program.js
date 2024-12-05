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
        credentials: "include", // 세션 쿠키 포함
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            console.log("프로그램 저장 성공:", data);
            window.location.href = "program.html"; // 성공하면 페이지 이동
          } else {
            alert("프로그램 저장 실패: " + data.message); // 실패 시 오류 메시지 표시
          }
        })
        .catch((error) => {
          console.error("프로그램 저장 실패:", error);
          alert("저장 중 오류가 발생했습니다. 다시 시도해주세요.");
        });
    });
  } else {
    console.error("프로그램 폼을 찾을 수 없습니다.");
  }
});
