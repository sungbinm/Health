document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.querySelector(".text-wrapper");
  const elInputUsername = document.querySelector("#username");
  const elInputPassword = document.querySelector("#password");

  loginButton.addEventListener("click", (e) => {
    e.preventDefault();

    const username = elInputUsername.value.trim();
    const password = elInputPassword.value.trim();

    // 유효성 검사
    if (!username || !password) {
      alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    // 서버로 로그인 요청 보내기
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
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
  });
});
