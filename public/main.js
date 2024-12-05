document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.getElementById("loginButton");
  const usernameDisplay = document.getElementById("usernameDisplay");

  // 로그인 상태 확인
  fetch("http://localhost:3000/check-session", { credentials: "include" })
    .then((response) => {
      if (!response.ok) {
        throw new Error("로그인되지 않음"); // 401 또는 404 처리
      }
      return response.json();
    })
    .then((data) => {
      usernameDisplay.textContent = `${data.username}님`;
      loginButton.style.display = "none"; // 로그인 버튼 숨기기
    })
    .catch((error) => {
      console.error("세션 확인 에러:", error.message);
    });
});

function goToLogin() {
  window.location.href = "login.html";
}
