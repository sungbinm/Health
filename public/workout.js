// Chest class
class Chest {
  constructor() {
    this.chest_set = 0;
  }
}

// Back class
class Back {
  constructor() {
    this.back_set = 0;
  }
}

// Shoulder class
class Shoulders {
  constructor() {
    this.front_set = 0;
    this.side_set = 0;
    this.rear_set = 0;
  }
}

// Arms class
class Arms {
  constructor() {
    this.biceps_sets = 0;
    this.triceps_sets = 0;
  }
}

// Abs class
class Abs {
  constructor() {
    this.abs_sets = 0;
  }
}

// Legs class
class Legs {
  constructor() {
    this.hamstring_sets = 0;
    this.quadriceps_sets = 0;
    this.hips_sets = 0;
    this.calf_sets = 0;
  }
}

// Main Workout class to manage all muscle groups
class Workout {
  constructor() {
    this.chest = new Chest();
    this.back = new Back();
    this.shoulders = new Shoulders();
    this.arms = new Arms();
    this.abs = new Abs();
    this.legs = new Legs();
  }
}

// Example usage
const myWorkout = new Workout();



// ---

class WorkoutProgram {
  constructor() {
    this.exercises = []; // 운동 목록을 저장할 배열
  }

  // 운동 추가 메서드
  addExercise(name, sets, weight, reps, restTime) {
    const exercise = {
      name,       // 운동 종목
      sets,       // 세트 수
      weight,     // 무게
      reps,       // 반복 횟수
      restTime,   // 휴식 시간 (초)
    };
    this.exercises.push(exercise);
  }

  // 운동 프로그램 출력 메서드
  isemptyProgram() {
    if (this.exercises.length === 0) {
      return "empty";
    }
    return;
  }

  // 특정 운동 삭제 메서드
  removeExercise(index) {
    if (index < 0 || index >= this.exercises.length) {
      return;
    }
    const removed = this.exercises.splice(index, 1);
    console.log(`운동 ${removed[0].name}이 삭제되었습니다.`);
  }
}

// 사용자 입력 시뮬레이션
const myProgram = new WorkoutProgram();

// 예제 사용
myProgram.addExercise("벤치프레스", 4, 80, 10, 90);
myProgram.addExercise("스쿼트", 5, 100, 12, 120);
myProgram.addExercise("데드리프트", 3, 120, 8, 180);

// 운동 프로그램 출력
myProgram.printProgram();

// 특정 운동 삭제
myProgram.removeExercise(1); // 두 번째 운동 삭제
myProgram.printProgram();










// 사용자 운동 프로그램 관리 리스트
let workoutProgram = [];
let bodyPartSets = { // 각 
  chest: 0,
  back : 0,
  frontShoulder: 0,
  sideShoulder: 0,
  rearSholder: 0,
  biceps: 0,
  triceps: 0,
  abs: 0,
  quads: 0, // 대퇴사두
  glutes: 0, // 둔부
  hamstrings: 0, // 햄스트링
  calf: 0 // 종아리
};


const exerciseMapping = {
  벤치프레스: { chest: 1, back: 0, frontShoulder: 0.5, sideShoulder: 0,
    rearShoulder:0, biceps: 0, triceps: 0.5, abs:0, quads: 0, glutes:0, hamstrings:0, calf:0},
  하이바스쿼트: { chest: 0, back: 0, frontShoulder: 0, sideShoulder: 0,
    rearShoulder:0, biceps: 0, triceps: 0, abs:0, quads: 1, glutes:0.5, hamstrings:0.5, calf:0},
  로우바스쿼트: { chest: 0, back: 0, frontShoulder: 0, sideShoulder: 0,
    rearShoulder:0, biceps: 0, triceps: 0, abs:0, quads: 0.5, glutes:1, hamstrings:1, calf:0},
  데드리프트: { chest: 0, back: 0.5, frontShoulder: 0, sideShoulder: 0,
    rearShoulder:0, biceps: 0, triceps: 0, abs:0, quads: 0.5, glutes:1, hamstrings:1, calf:0},
  숄더프레스: { chest: 0, back: 0, frontShoulder: 1, sideShoulder: 1,
    rearShoulder:0, biceps: 0, triceps: 0, abs:0, quads: 0, glutes:0, hamstrings:0, calf:0}
};

// 운동 추가 함수
function addExercise(name, sets, weight, reps, restTime) {
  const exercise = {
    name,       // 운동 종목
    sets,       // 세트 수
    weight,     // 무게
    reps,       // 반복 횟수
    restTime,   // 휴식 시간 (초)
  };
  workoutProgram.push(exercise);
}

// 운동 삭제 함수
function removeExercise(index) {
  const removedExercise = workoutProgram.splice(index, 1)[0];
  const { name, sets } = removedExercise;


// 추가된 운동의 세트 수 증가
function updateBodyPartSets(name, sets) {
  if (exerciseMapping[name]) {
    const mapping = exerciseMapping[name];
    bodyPartSets.chest += mapping.chest * sets;
    bodyPartSets.back += mapping.chest * sets;
    bodyPartSets.frontShoulder += mapping.frontShoulder * sets;
    bodyPartSets.sideShoulder += mapping.sideShoulder * sets;
    bodyPartSets.rearShoulder += mapping.reartShoulder * sets;
    bodyPartSets.biceps += mapping.biceps * sets;
    bodyPartSets.triceps += mapping.triceps * sets;
    bodyPartSets.abs += mapping.abs * sets;
    bodyPartSets.quads += mapping.quads * sets;
    bodyPartSets.glutes += mapping.glutes * sets;
    bodyPartSets.hamstrings += mapping.hamstring_sets * sets;
    bodyPartSets.calf += mapping.calf * sets;
    updateBodyPartUI();
  }
}

  // 삭제된 운동의 세트 수 차감
  if (exerciseMapping[name]) {
    const mapping = exerciseMapping[name];
    bodyPartSets.chest -= mapping.chest * sets;
    bodyPartSets.back -= mapping.chest * sets;
    bodyPartSets.frontShoulder -= mapping.frontShoulder * sets;
    bodyPartSets.sideShoulder -= mapping.sideShoulder * sets;
    bodyPartSets.rearShoulder -= mapping.reartShoulder * sets;
    bodyPartSets.biceps -= mapping.biceps * sets;
    bodyPartSets.triceps -= mapping.triceps * sets;
    bodyPartSets.abs -= mapping.abs * sets;
    bodyPartSets.quads -= mapping.quads * sets;
    bodyPartSets.glutes -= mapping.glutes * sets;
    bodyPartSets.hamstrings -= mapping.hamstring_sets * sets;
    bodyPartSets.calf -= mapping.calf * sets;
    updateBodyPartUI();
  }

  renderProgram();
}

// UI 업데이트 - 운동 프로그램
function renderProgram() {
  const programDiv = document.getElementById("program");
  programDiv.innerHTML = "";

  workoutProgram.forEach((exercise, index) => {
    const exerciseDiv = document.createElement("div");
    exerciseDiv.classList.add("exercise");

    exerciseDiv.innerHTML = `
      <span>${exercise.name} - ${exercise.reps}회 x ${exercise.sets}세트 (${exercise.weight}kg)</span>
      <button onclick="removeExercise(${index})">X</button>
    `;
    programDiv.appendChild(exerciseDiv);
  });
}

// UI 업데이트 - 부위별 세트
function updateBodyPartUI() {
  document.getElementById("chestSets").innerText = bodyPartSets.chest;
  document.getElementById("frontShoulderSets").innerText = bodyPartSets.frontShoulder;
  document.getElementById("tricepsSets").innerText = bodyPartSets.triceps;
}




//


// 운동 데이터를 저장할 배열
let workoutRoutines = [];

// 운동 프로그램 추가 API
app.post("/addWorkout", (req, res) => {
  const { username, exercise, sets, reps, weight, restTime } = req.body;

  // 데이터 유효성 검사
  if (!username || !exercise || !sets || !reps || !weight || !restTime) {
    return res.status(400).json({ message: "모든 필드를 입력해 주세요." });
  }

  // 운동 데이터 저장
  workoutRoutines.push({
    username,
    exercise,
    sets,
    reps,
    weight,
    restTime,
  });

  res.status(201).json({ message: "운동 프로그램이 저장되었습니다!" });
});

// 모든 운동 데이터 조회 API (옵션)
app.get("/getWorkouts", (req, res) => {
  res.status(200).json(workoutRoutines);
});