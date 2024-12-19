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

function goToDeloading_set() { // 디로딩 프로그램(세트수)
  window.location.href = "program_deloading_set.html";
}

function goToDeloading_reps() { // 디로딩 프로그램(횟수)
  window.location.href = "program_deloading_reps.html";
}



function goToDeloading_set() { // 디로딩 프로그램(중량)
  window.location.href = "program_deloading_weight.html";
}


function goToRecommend() {
  window.location.href = "program_recommend.html";
}

function goToProgram() {
  window.location.href = "program.html";
}

function goToDictionary() {
  window.location.href = "dictionary.html";
}

function goToStretching() {
  window.location.href = "stretching.html";
}

function goToTraining() {
  window.location.href = "training.html";
}

function goToAddprogram() {
  window.location.href = "add_program.html";
}

function goToChest() {
  window.location.href = "choosing_event_chest.html";
}

function goToExercise() {
  window.location.href = "exercise.html";
}

function goToCalendar() {
  window.location.href = "workout_calendar.html";
}

function logout() {
  fetch("http://localhost:3000/logout", {
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
  fetch("/check-session", { credentials: "include" })
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
    fetch("/logout", {
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

// 회복력 선택에 따라 디로딩 주기 업데이트
function updateDeloadingCycle() {
  var resilience = document.getElementById("resilience").value;
  var deloadingInput = document.getElementById("deloadingCycleInput");

  // 회복력 선택에 따른 주기 설정
  var cycleDuration = {
    best: "8주",
    upper: "7주",
    middle: "6주",
    lower: "5주",
    lowest: "4주",
  };

  // (추천 : n주) 표시
  deloadingInput.value = cycleDuration[resilience] || "8주"; // 기본값은 8주
}
