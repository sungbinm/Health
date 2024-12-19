// DOM Elements
const daysContainer = document.getElementById("days");
const currentMonth = document.getElementById("current-month");
const prevMonthBtn = document.getElementById("prev-month");
const nextMonthBtn = document.getElementById("next-month");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("close-modal");
const selectedDateElement = document.getElementById("selected-date");
const exerciseTableBody = document.getElementById("exercise-table-body");
const addExerciseButton = document.getElementById("add-exercise-button");
const exerciseForm = document.getElementById("exercise-form");
const saveExerciseButton = document.getElementById("save-exercise-button");
const exerciseName = document.getElementById("exercise-name");
const setsInput = document.getElementById("sets");
const repsInput = document.getElementById("reps");
const weightInput = document.getElementById("weight"); // 무게 입력 필드
const restTimeInput = document.getElementById("rest-time"); // 휴식시간 입력 필드

// Variables
let date = new Date();
let exerciseRecords = {}; // 날짜별 운동 기록 저장 객체
let currentEditDate = null; // 수정할 날짜
let currentEditIndex = null; // 수정할 운동의 인덱스

// Calendar 생성
// 요일 배열 (일요일부터 토요일까지)
const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

function generateCalendar() {
  daysContainer.innerHTML = "";
  const year = date.getFullYear();
  const month = date.getMonth();

  currentMonth.textContent = `${year}년 ${month + 1}월`;

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate(); // 해당 월의 마지막 날짜

  const dayLabels = document.querySelectorAll(".day-label");
  dayLabels.forEach((dayLabel, index) => {
    dayLabel.textContent = daysOfWeek[index];
  });

  for (let i = 0; i < firstDay; i++) {
    const emptyDiv = document.createElement("div");
    daysContainer.appendChild(emptyDiv);
  }

  for (let day = 1; day <= lastDate; day++) {
    const dayDiv = document.createElement("div");
    dayDiv.className = "day";
    const formattedDate = `${year}-${String(month + 1).padStart(
      2,
      "0"
    )}-${String(day).padStart(2, "0")}`;
    dayDiv.textContent = day;

    if (exerciseRecords[formattedDate]) {
      dayDiv.classList.add("has-record");
    }

    dayDiv.addEventListener("click", () => openModal(formattedDate));
    daysContainer.appendChild(dayDiv);
  }
}

function openModal(date) {
  currentEditDate = date;
  selectedDateElement.textContent = `날짜: ${date}`;
  const exercises = exerciseRecords[date] || [];

  exerciseTableBody.innerHTML = ""; // 테이블 초기화

  exercises.forEach((exercise, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${exercise.name}</td>
      <td>${exercise.reps}</td>
      <td>${exercise.sets}</td>
      <td>${exercise.weight}</td>
      <td>${exercise.restTime}</td>
      <td><button class="edit-button" data-index="${index}">수정</button></td>
      <td><button class="delete-button" data-index="${index}">삭제</button></td>
    `;
    exerciseTableBody.appendChild(row);
  });

  addExerciseButton.classList.remove("hidden");
  exerciseForm.classList.add("hidden");
  modal.classList.remove("hidden");

  // 수정, 삭제 버튼 이벤트 리스너
  const editButtons = document.querySelectorAll(".edit-button");
  editButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      editExercise(index);
    });
  });

  const deleteButtons = document.querySelectorAll(".delete-button");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      deleteExercise(index);
    });
  });
}

// Add New Exercise
addExerciseButton.addEventListener("click", () => {
  addExerciseButton.classList.add("hidden");
  exerciseForm.classList.remove("hidden");
  currentEditIndex = null;
});

// Save New Exercise or Edit Exercise
saveExerciseButton.addEventListener("click", () => {
  const newExercise = {
    name: exerciseName.value,
    reps: repsInput.value,
    sets: setsInput.value,
    weight: weightInput.value,
    restTime: restTimeInput.value,
  };

  if (currentEditIndex === null) {
    if (!exerciseRecords[currentEditDate]) {
      exerciseRecords[currentEditDate] = [];
    }
    exerciseRecords[currentEditDate].push(newExercise);
  } else {
    exerciseRecords[currentEditDate][currentEditIndex] = newExercise;
  }

  exerciseName.value = "";
  repsInput.value = "";
  setsInput.value = "";
  weightInput.value = "";
  restTimeInput.value = "";

  exerciseForm.classList.add("hidden");
  addExerciseButton.classList.remove("hidden");
  generateCalendar();
  openModal(currentEditDate);
});

// Edit Exercise
function editExercise(index) {
  const exercise = exerciseRecords[currentEditDate][index];
  exerciseName.value = exercise.name;
  repsInput.value = exercise.reps;
  setsInput.value = exercise.sets;
  weightInput.value = exercise.weight;
  restTimeInput.value = exercise.restTime;

  currentEditIndex = index;
  addExerciseButton.classList.add("hidden");
  exerciseForm.classList.remove("hidden");
}

// Delete Exercise
function deleteExercise(index) {
  exerciseRecords[currentEditDate].splice(index, 1);

  if (exerciseRecords[currentEditDate].length === 0) {
    delete exerciseRecords[currentEditDate];
  }

  generateCalendar();
  openModal(currentEditDate);
}

// Close Modal
closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// Month Navigation
prevMonthBtn.addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  generateCalendar();
});

nextMonthBtn.addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  generateCalendar();
});

// Initialize Calendar
generateCalendar();
