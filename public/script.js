function goToLogin() {
  window.location.href = "login.html";
}

function goToHome() {
  window.location.href = "main.html";
}

function goToSignup() {
  window.location.href = "signup.html";
}

function goToWorkoutexplanation() {
  window.location.href = "workout_explanation.html";
}

function goBack() {
  history.back();
}

function goToDeloading() {
  window.location.href = "volume_deloading.html";
}

function goToProgram() {
  window.location.href = "program.html";
}

function Register() {
  const id = document.querySelector(
    ".form-register input[placeholder='Input ID']"
  ).value;
  const password = document.querySelector(
    ".form-register input[placeholder='Input Password']"
  ).value;

  fetch("/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === "회원가입 성공!") {
        alert(data.message);
        window.location.href = "/public/login.html"; // 로그인 페이지로 이동
      } else {
        alert(data.message);
      }
    })
    .catch((error) => console.error("Error:", error));
}

function Login() {
  const id = document.querySelector(
    ".form-log-in input[placeholder='Input ID']"
  ).value;
  const password = document.querySelector(
    ".form-log-in input[placeholder='Input Password']"
  ).value;

  fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === "로그인 성공!") {
        alert(data.message);
        // 홈 화면으로 이동
        window.location.href = "/";
      } else {
        alert(data.message);
      }
    })
    .catch((error) => console.error("Error:", error));
}

async function registerUser() {
  const id = document.querySelector('.input[placeholder="Input ID"]').value;
  const password = document.querySelector(
    '.input[placeholder="Input Password"]'
  ).value;

  try {
    const response = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, password }),
    });

    const result = await response.json();
    if (response.ok) {
      alert(result.message); // 회원가입 성공 메시지
      window.location.href = "/login.html"; // 로그인 화면으로 이동
    } else {
      alert(result.message); // 오류 메시지
    }
  } catch (error) {
    console.error("회원가입 중 오류 발생:", error);
  }
}

document.querySelector(".text-wrapper").addEventListener("click", registerUser);

document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelector(".text-wrapper")
    .addEventListener("click", registerUser);
});
