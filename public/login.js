const API_URL = "https://health-feo8.onrender.com";

document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.querySelector(".text-wrapper");
  const elInputUsername = document.querySelector("#username");
  const elInputPassword = document.querySelector("#password");

  // 클릭 시 동작
  loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    handleLogin();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      // Enter 키를 감지
      e.preventDefault();
      handleLogin();
    }
  });

  function handleLogin() {
    const username = elInputUsername.value.trim();
    const password = elInputPassword.value.trim();

    // 유효성 검사
    if (!username || !password) {
      alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    // 서버로 로그인 요청 보내기
    fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
      credentials: "include", // 세션 쿠키 포함
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.message || "로그인 실패");
          });
        }
        return response.json();
      })
      .then((data) => {
        if (data.message === "로그인 성공!") {
          alert("로그인 성공!");
          window.location.href = "main.html"; // 로그인 성공 후 리다이렉션
        } else {
          alert(data.message); // 오류 메시지 표시
        }
      })
      .catch((error) => {
        alert("로그인 실패: " + error.message);
      });
  }
});
