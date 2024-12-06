const API_URL = "https://health-feo8.onrender.com";

const pages = {
  goToLogin: "login.html",
  goToHome: "main.html",
  goToSignup: "signup.html",
  goToWorkoutexplanation: "workout_explanation.html",
  goToDeloading: "volume_deloading.html",
  goToProgram: "program.html",
  goToDictionary: "dictionary.html",
  goToStretching: "stretching.html",
  goToTraining: "training.html",
  goToAddprogram: "add_program.html",
  goToChest: "exercise.html",
  goToBack: "add_program.html",
  goToShoulder: "add_program.html",
  goToArm: "add_program.html",
  goToAbs: "add_program.html",
  goToLowerbody: "add_program.html",
};

function goToPage(page) {
  window.location.href = pages[page];
}

function logout() {
  fetch(`${API_URL}/logout`, {
    method: "POST",
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === "로그아웃 성공") {
        alert("로그아웃되었습니다.");
        window.location.reload(); // 페이지 새로고침
      }
    })
    .catch((error) => {
      console.error("로그아웃 실패:", error.message);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  const usernameDisplay = document.getElementById("usernameDisplay");
  const loginButton = document.getElementById("loginButton");
  const logoutButton = document.getElementById("logoutButton");

  // 세션 상태 확인
  fetch(`${API_URL}/checksession`, { credentials: "include" })
    .then((response) => {
      if (!response.ok) {
        throw new Error("로그인되지 않음");
      }
      return response.json();
    })
    .then((data) => {
      // 로그인 상태인 경우: 사용자 이름 표시, 로그인 버튼 숨기기, 로그아웃 버튼 보이기
      usernameDisplay.textContent = `${data.username}님 환영합니다!`;
      loginButton.style.display = "none";
      logoutButton.style.display = "inline-block";
    })
    .catch((error) => {
      // 로그인되지 않은 경우: UI를 원래 상태로 복구
      console.error("세션 확인 에러:", error.message);
      usernameDisplay.textContent = ""; // 사용자 이름 지우기
      loginButton.style.display = "block"; // 로그인 버튼 보이기
      logoutButton.style.display = "none"; // 로그아웃 버튼 숨기기
    });

  // 로그아웃 동작
  logoutButton.addEventListener("click", () => {
    fetch(`${API_URL}/logout`, {
      // API_URL을 사용하도록 수정
      method: "POST",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          alert("로그아웃 되었습니다.");
          window.location.reload(); // 페이지 새로고침
        } else {
          alert("로그아웃 실패!");
        }
      })
      .catch((error) => {
        console.error("로그아웃 에러:", error.message);
      });
  });
});

function updateRecommendedWeeks() {
  const recoverySelect = document.getElementById("recoverySelect");
  const selectedValue = recoverySelect.value;
  const recommendedWeeks = document.getElementById("recommendedWeeks");

  let weeks = 4; // 기본 값은 4주 (최하)
  if (selectedValue === "LOW") {
    weeks = 5;
  } else if (selectedValue === "MEDIUM") {
    weeks = 6;
  } else if (selectedValue === "HIGH") {
    weeks = 7;
  } else if (selectedValue === "HIGHEST") {
    weeks = 8;
  }

  recommendedWeeks.textContent = `(추천 : ${weeks}주)`; // 선택된 값에 따라 텍스트 업데이트
}
