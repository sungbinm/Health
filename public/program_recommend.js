// 운동 프로그램 추천 시스템
function generateProgram() {
  const height = document.getElementById("height").value;
  const weight = document.getElementById("weight").value;

  if (!height || !weight) {
    alert("키와 몸무게를 입력해주세요.");
    return;
  }

  const bmi = calculateBMI(height, weight);
  let program = getProgram(bmi);

  // 프로그램 표시
  displayProgram(program);
}

// BMI 계산 함수
function calculateBMI(height, weight) {
  const heightInMeter = height / 100;
  return (weight / (heightInMeter * heightInMeter)).toFixed(2);
}

// BMI에 따른 운동 프로그램 설정
function getProgram(bmi) {
  let program = [];

  if (bmi < 18.5) {
    // 저체중 (BMI < 18.5)
    program = [
      {
        day: "월요일",
        exercises: [
          { name: "스쿼트", reps: 12, sets: 4, weight: "60kg", rest: "90초" },
          {
            name: "벤치프레스",
            reps: 10,
            sets: 4,
            weight: "50kg",
            rest: "90초",
          },
          {
            name: "바벨 로우",
            reps: 12,
            sets: 4,
            weight: "40kg",
            rest: "90초",
          },
        ],
      },
      {
        day: "화요일",
        exercises: [
          {
            name: "데드리프트",
            reps: 12,
            sets: 4,
            weight: "80kg",
            rest: "90초",
          },
          {
            name: "덤벨 플라이",
            reps: 12,
            sets: 3,
            weight: "10kg",
            rest: "60초",
          },
          { name: "푸쉬업", reps: 15, sets: 3, weight: "체중", rest: "60초" },
        ],
      },
      {
        day: "수요일",
        exercises: [
          { name: "풀업", reps: 8, sets: 3, weight: "체중", rest: "90초" },
          {
            name: "덤벨 숄더 프레스",
            reps: 12,
            sets: 3,
            weight: "12kg",
            rest: "90초",
          },
          {
            name: "복근 운동 (크런치)",
            reps: 20,
            sets: 3,
            weight: "체중",
            rest: "60초",
          },
        ],
      },
      {
        day: "목요일",
        exercises: [
          { name: "스쿼트", reps: 12, sets: 4, weight: "60kg", rest: "90초" },
          {
            name: "플랭크",
            reps: "60초",
            sets: 3,
            weight: "체중",
            rest: "60초",
          },
        ],
      },
      {
        day: "금요일",
        exercises: [
          {
            name: "벤치프레스",
            reps: 12,
            sets: 4,
            weight: "60kg",
            rest: "90초",
          },
          {
            name: "바벨 로우",
            reps: 12,
            sets: 4,
            weight: "40kg",
            rest: "90초",
          },
        ],
      },
      {
        day: "토요일",
        exercises: [
          {
            name: "카디오 운동",
            reps: "30분",
            sets: 1,
            weight: "체중",
            rest: "없음",
          },
        ],
      },
      {
        day: "일요일",
        exercises: [
          {
            name: "휴식",
            reps: "없음",
            sets: "없음",
            weight: "없음",
            rest: "없음",
          },
        ],
      },
    ];
  } else if (bmi >= 18.5 && bmi < 24.9) {
    // 정상 체중 (18.5 ≤ BMI < 24.9)
    program = [
      {
        day: "월요일",
        exercises: [
          { name: "스쿼트", reps: 12, sets: 4, weight: "70kg", rest: "90초" },
          {
            name: "벤치프레스",
            reps: 12,
            sets: 4,
            weight: "60kg",
            rest: "90초",
          },
          {
            name: "바벨 로우",
            reps: 12,
            sets: 4,
            weight: "50kg",
            rest: "90초",
          },
        ],
      },
      {
        day: "화요일",
        exercises: [
          {
            name: "데드리프트",
            reps: 12,
            sets: 4,
            weight: "100kg",
            rest: "90초",
          },
          {
            name: "덤벨 플라이",
            reps: 12,
            sets: 4,
            weight: "12kg",
            rest: "60초",
          },
          { name: "푸쉬업", reps: 20, sets: 3, weight: "체중", rest: "60초" },
        ],
      },
      {
        day: "수요일",
        exercises: [
          { name: "풀업", reps: 12, sets: 3, weight: "체중", rest: "90초" },
          {
            name: "덤벨 숄더 프레스",
            reps: 12,
            sets: 4,
            weight: "15kg",
            rest: "90초",
          },
          {
            name: "복근 운동 (크런치)",
            reps: 25,
            sets: 3,
            weight: "체중",
            rest: "60초",
          },
        ],
      },
      {
        day: "목요일",
        exercises: [
          { name: "스쿼트", reps: 15, sets: 4, weight: "80kg", rest: "90초" },
          {
            name: "플랭크",
            reps: "90초",
            sets: 3,
            weight: "체중",
            rest: "60초",
          },
        ],
      },
      {
        day: "금요일",
        exercises: [
          {
            name: "벤치프레스",
            reps: 12,
            sets: 4,
            weight: "70kg",
            rest: "90초",
          },
          {
            name: "바벨 로우",
            reps: 12,
            sets: 4,
            weight: "50kg",
            rest: "90초",
          },
        ],
      },
      {
        day: "토요일",
        exercises: [
          {
            name: "카디오 운동",
            reps: "30분",
            sets: 1,
            weight: "체중",
            rest: "없음",
          },
        ],
      },
      {
        day: "일요일",
        exercises: [
          {
            name: "휴식",
            reps: "없음",
            sets: "없음",
            weight: "없음",
            rest: "없음",
          },
        ],
      },
    ];
  } else {
    // 과체중 또는 비만 (BMI >= 25)
    program = [
      {
        day: "월요일",
        exercises: [
          { name: "스쿼트", reps: 10, sets: 4, weight: "50kg", rest: "90초" },
          {
            name: "벤치프레스",
            reps: 10,
            sets: 4,
            weight: "45kg",
            rest: "90초",
          },
          {
            name: "바벨 로우",
            reps: 12,
            sets: 4,
            weight: "40kg",
            rest: "90초",
          },
        ],
      },
      {
        day: "화요일",
        exercises: [
          {
            name: "데드리프트",
            reps: 12,
            sets: 4,
            weight: "70kg",
            rest: "90초",
          },
          {
            name: "덤벨 플라이",
            reps: 10,
            sets: 4,
            weight: "8kg",
            rest: "60초",
          },
          { name: "푸쉬업", reps: 20, sets: 3, weight: "체중", rest: "60초" },
        ],
      },
      {
        day: "수요일",
        exercises: [
          { name: "풀업", reps: 8, sets: 3, weight: "체중", rest: "90초" },
          {
            name: "덤벨 숄더 프레스",
            reps: 12,
            sets: 3,
            weight: "10kg",
            rest: "90초",
          },
          {
            name: "복근 운동 (크런치)",
            reps: 20,
            sets: 3,
            weight: "체중",
            rest: "60초",
          },
        ],
      },
      {
        day: "목요일",
        exercises: [
          { name: "스쿼트", reps: 10, sets: 4, weight: "50kg", rest: "90초" },
          {
            name: "플랭크",
            reps: "60초",
            sets: 3,
            weight: "체중",
            rest: "60초",
          },
        ],
      },
      {
        day: "금요일",
        exercises: [
          {
            name: "벤치프레스",
            reps: 12,
            sets: 4,
            weight: "50kg",
            rest: "90초",
          },
          {
            name: "바벨 로우",
            reps: 12,
            sets: 4,
            weight: "40kg",
            rest: "90초",
          },
        ],
      },
      {
        day: "토요일",
        exercises: [
          {
            name: "카디오 운동",
            reps: "30분",
            sets: 1,
            weight: "체중",
            rest: "없음",
          },
        ],
      },
      {
        day: "일요일",
        exercises: [
          {
            name: "휴식",
            reps: "없음",
            sets: "없음",
            weight: "없음",
            rest: "없음",
          },
        ],
      },
    ];
  }

  return program;
}

// 운동 프로그램 표시 함수
function displayProgram(program) {
  const programList = document.getElementById("programList");
  programList.innerHTML = ""; // 기존 프로그램 리스트 초기화

  program.forEach((day) => {
    const dayDiv = document.createElement("div");
    const dayTitle = document.createElement("h3");
    dayTitle.textContent = `${day.day}`;
    dayDiv.appendChild(dayTitle);

    const exerciseList = document.createElement("ul");
    day.exercises.forEach((exercise) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${exercise.name}: ${exercise.reps}회 × ${exercise.sets}세트, 무게: ${exercise.weight}, 휴식: ${exercise.rest}`;
      exerciseList.appendChild(listItem);
    });

    dayDiv.appendChild(exerciseList);
    programList.appendChild(dayDiv);
  });

  document.getElementById("program").style.display = "block"; // 프로그램 영역 표시
}

function uploadProgram() {
  // 프로그램 데이터를 로컬스토리지에 저장
  const program = JSON.parse(localStorage.getItem("currentProgram"));

  if (!program || program.length === 0) {
    alert("업로드할 운동 프로그램이 없습니다.");
    return;
  }

  // 로컬스토리지에 저장 후 program.html로 이동
  window.location.href = "program.html";
}

function displayProgram(program) {
  const programList = document.getElementById("programList");
  programList.innerHTML = ""; // 기존 프로그램 리스트 초기화

  // 프로그램 데이터 저장 (localStorage)
  localStorage.setItem("currentProgram", JSON.stringify(program));

  program.forEach((day) => {
    const dayDiv = document.createElement("div");
    const dayTitle = document.createElement("h3");
    dayTitle.textContent = `${day.day}`;
    dayDiv.appendChild(dayTitle);

    const exerciseList = document.createElement("ul");
    day.exercises.forEach((exercise) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${exercise.name}: ${exercise.reps}회 × ${exercise.sets}세트, 무게: ${exercise.weight}, 휴식: ${exercise.rest}`;
      exerciseList.appendChild(listItem);
    });

    dayDiv.appendChild(exerciseList);
    programList.appendChild(dayDiv);
  });

  document.getElementById("program").style.display = "block"; // 프로그램 영역 표시
}
