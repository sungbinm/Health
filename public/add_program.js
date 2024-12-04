document.getElementById("programForm").addEventListener("submit", function (e) {
  e.preventDefault(); // 폼 제출 방지

  // 입력값 가져오기
  const day = document.getElementById("day").value;
  const exercise = document.getElementById("exercise").value;
  const count = document.getElementById("count").value;
  const setCount = document.getElementById("set_count").value;
  const weight = document.getElementById("weight").value;
  const time = document.getElementById("time").value;

  // 프로그램 데이터 저장 형식
  const programEntry = `${exercise} / ${count} / ${setCount} / ${weight} / ${time}`;

  // 로컬 스토리지에 저장
  const storedPrograms = JSON.parse(localStorage.getItem("programs")) || {};
  if (!storedPrograms[day]) {
    storedPrograms[day] = [];
  }
  storedPrograms[day].push(programEntry);

  localStorage.setItem("programs", JSON.stringify(storedPrograms));

  // program.html로 이동
  window.location.href = "program.html";
});
