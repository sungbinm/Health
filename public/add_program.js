document.getElementById("programForm").addEventListener("submit", function (e) {
  e.preventDefault(); // 폼 제출 방지

  // 입력값 가져오기
  const day = document.getElementById("day").value;
  const exercise = document.getElementById("exercise").value;
  const count = document.getElementById("count").value;
  const setCount = document.getElementById("set_count").value;
  const weight = document.getElementById("weight").value;
  const time = document.getElementById("time").value;

  // 서버로 데이터 전송
  fetch("/save-program", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ day, exercise, count, setCount, weight, time }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("프로그램 저장 실패. 로그인 여부를 확인하세요.");
      }
      return response.json();
    })
    .then((data) => {
      if (data.success) {
        window.location.href = "program.html";
      } else {
        alert("프로그램 저장에 실패했습니다.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert(error.message);
    });
});
