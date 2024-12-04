const express = require("express");
const router = express.Router();

let workoutRoutines = {}; // 사용자별 데이터를 저장하는 객체

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

  res.status(201).json({ message: "운동 프로그램이 저장되었습니다!" });
});

// 사용자 운동 루틴 조회 API
router.get("/", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "로그인이 필요합니다." });
  }

  const username = req.session.user.username;
  const userWorkouts = workoutRoutines[username] || {};

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
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
}