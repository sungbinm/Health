const express = require("express");
const router = express.Router();

const muscle_activation_data = {
  벤치프레스: { chest: 1, triceps: 0.5, frontShoulder: 0.5 }, // 벤치프레스: chest는 주동근, triceps와 frontShoulder는 협응근
  인클라인벤치프레스: { chest: 1, frontShoulder: 0.5, triceps: 0.5 }, // 인클라인 벤치프레스: chest는 주동근, frontShoulder와 triceps는 협응근
  덤벨벤치프레스: { chest: 1, triceps: 0.5, frontShoulder: 0.5 }, // 덤벨 벤치프레스: chest는 주동근, triceps와 frontShoulder는 협응근
  덤벨프레스: { chest: 1, triceps: 0.5, frontShoulder: 0.5 }, // 덤벨 벤치프레스: chest는 주동근, triceps와 frontShoulder는 협응근
  인클라인덤벨프레스: { chest: 1, triceps: 0.5, frontShoulder: 0.5 }, // 덤벨 벤치프레스: chest는 주동근, triceps와 frontShoulder는 협응근
  딥스: { chest: 1, triceps: 1}, // 딥스: chest와 triceps는 주동근, frontShoulder는 협응근
  푸시업: { chest: 1, triceps: 0.5, frontShoulder: 0.5 }, // 푸시업: chest는 주동근, triceps와 frontShoulder는 협응근
  스쿼트: { quads: 1, glutes: 0.5, hamstrings: 0.5 }, // 스쿼트: quads는 주동근, glutes와 hamstrings는 협응근
  레그프레스: { quads: 1, glutes: 0.5, hamstrings: 0.5},
  데드리프트: { hamstrings: 1, glutes: 1, Back: 0.5 }, // 데드리프트: hamstrings와 glutes는 주동근, lowerBack은 협응근
  풀업: { back: 1}, 
  벤트오버로우: { back: 1},
  밀리터리프레스: { frontShoulder: 1, sideShoulder: 1},
  바벨컬: { biceps: 1},
  이지바바벨컬: { biceps: 1},
  이지바벨컬: { biceps: 1},
  케이블컬: {biceps: 1},
  덤벨컬: { biceps: 1},
  케이블컬: { biceps: 1},
  인클라인덤벨컬: { biceps: 1},
  크런치: { abs: 1},
  플랭크: { abs: 1},
  레그레이즈: {abs: 1},
  행잉레그레이즈: {abs: 1},
  런지: { quads: 1, glutes: 0.5, hamstrings: 0.5 }, // 런지: quads는 주동근, glutes와 hamstrings는 협응근
  해머컬: { biceps: 1},
  트라이셉스푸시다운: { triceps: 1},
  케이블트라이셉스푸시다운: { triceps: 1},
  케이블푸시다운: { triceps: 1},
  케이블로프푸시다운: { triceps: 1},
  로프푸시다운: { triceps: 1},
  벤치딥스: { triceps: 1},
  시티드로우: { back: 1},
  덤벨로우: { back: 1},
  원암덤벨로우: { back: 1},
  체스트서포티드로우: { back: 1},
  체스트서포티드덤벨로우: { back: 1},
  바벨로우: { back: 1},
  티바로우: { back: 1},
  케이블시티드로우: { back: 1},
  오버그립시티드로우: { back: 1},
  언더그립시티드로우: { back: 1},
  패러럴그립시티드로우: { back: 1},
  롱풀: { back: 1},
  머신시티드로우: { back: 1}
};

// 사용자의 근육 활성화 데이터를 저장하는 객체 (데이터베이스나 파일 시스템에 저장 가능)
let muscleActivations = {}; // 예: { username: { chest: 0, triceps: 0, ... } }
let workoutRoutines = {}; // 사용자별 데이터를 저장하는 객체
let totalMuscleActivations = {}; // 부위별 총합을 저장하는 객체

// 운동 루틴 저장 API
router.post("/add", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "로그인이 필요합니다." });
  }

  const { exercise, sets, reps, weight, restTime, day } = req.body; // day는 사용자가 클릭한 요일
  const username = req.session.user.username;

  if (!exercise || !sets || !reps || !weight || !restTime || !day) {
    return res.status(400).json({ message: "모든 필드를 입력해 주세요." });
  }

  // day가 요일 형식으로 들어왔는지 확인 (예: 'Monday', 'Tuesday' 등)
  const validDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  if (!validDays.includes(day)) {
    return res.status(400).json({ message: "유효한 요일을 입력해 주세요." });
  }

  // 사용자별 운동 데이터 저장 (요일별로 분류)
  if (!workoutRoutines[username]) {
    workoutRoutines[username] = {};
  }

  if (!workoutRoutines[username][day]) {
    workoutRoutines[username][day] = [];
  }

  workoutRoutines[username][day].push({ exercise, sets, reps, weight, restTime });

  const muscleActivation = muscle_activation_data[exercise];
  if (!muscleActivation) {
    return res.status(400).json({ message: "알 수 없는 운동입니다." });
  }

   // 총합 업데이트
   if (!totalMuscleActivations[username]) {
    totalMuscleActivations[username] = {
      chest: 0, triceps: 0, frontShoulder: 0, sideShoulder: 0, rearShoulder: 0, biceps: 0,
      abs: 0, quads: 0, glutes: 0, hamstrings: 0, calf: 0, back: 0
    };
  }

  // 각 부위별 총합을 계산하여 업데이트
  Object.keys(muscleActivation).forEach((muscle) => {
    totalMuscleActivations[username][muscle] =
      (totalMuscleActivations[username][muscle] || 0) + muscleActivation[muscle] * sets;
  });

  // 근육 활성화 데이터를 새로운 객체로 관리 (서버에 저장)
  if (!muscleActivations[username][day]) {
    muscleActivations[username][day] = {
    chest: 0, triceps: 0, frontShoulder: 0, sideShoulder: 0, rearShoulder: 0, biceps: 0,
    abs: 0, quads: 0, glutes: 0, hamstrings: 0, calf: 0, back: 0
    };
  }

   // 근육 활성화 업데이트
   Object.keys(muscleActivation).forEach((muscle) => {
    muscleActivations[username][day][muscle] =
      (muscleActivation[username][day][muscle] || 0) +
      muscleActivation[muscle] * setCount;

      
  });

  res.status(201).json({
    message: "운동 프로그램이 저장되었습니다!",
    muscleData: totalMuscleActivations[username] // 클라이언트로 전송
  });
});

// 사용자 운동 루틴 조회 API
router.get("/", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "로그인이 필요합니다." });
  }

  const username = req.session.user.username;
  const userWorkouts = workoutRoutines[username] || {};
  const userMuscleActivations = muscleActivations[username] || {};

  res.status(200).json(userWorkouts);
});
// 조회 API로 화면에 띄우기?

module.exports = router;


// 운동 저장 함수(onclick 이벤트?)
function saveWorkout(day) {
  const workoutData = {
    exercise: "Push Up",
    sets: 3,
    reps: 15,
    weight: 0, // bodyweight exercise
    restTime: 60,
    day: day
  };

  fetch('/api/workouts/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(workoutData)
  })
  .then(response => response.json())
    .then(data => {
      if (data.muscleData) {
        // DOM 업데이트
        updateSetCounts(data.muscleData);
      }
      console.log(data.message);
    })
    .catch(error => console.error('Error:', error));
}




// 해당 사용자 정보에 맞는 세트수 업데이트
function updateSetCounts(username) {
  // totalMuscleActivations 객체에서 사용자 정보 가져오기
  const userMuscleData = totalMuscleActivations[username];

  // 각 부위별 세트수 업데이트
  function updateSetCounts(muscleData) {
    Object.keys(muscleData).forEach((muscle) => {
      const element = document.getElementById(`${muscle}SetCount`);
      if (element) {
        element.textContent = muscleData[muscle];
      }
    });
  }
}
// 서버로부터 데이터 가져오기
function fetchAndDisplayMuscleData() {
  fetch('/api/workouts/add', { method: 'POST' }) // 서버에서 POST 요청으로 데이터 가져옴
    .then(response => response.json())
    .then(data => {
      if (data.muscleData) {
        updateSetCounts(data.muscleData);
      } else {
        console.error("근육 데이터가 없습니다.");
      }
    })
    .catch(error => console.error("API 호출 중 오류 발생:", error));
}