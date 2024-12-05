
  // 입력값 가져오기
  const day = document.getElementById("day").value;
  const exercise = document.getElementById("exercise").value;
  const count = document.getElementById("count").value;
  const setCount = document.getElementById("set_count").value;
  const weight = document.getElementById("weight").value;
  const time = document.getElementById("time").value;

  // 프로그램 데이터 저장 형식
  const programEntry = `${exercise} / ${count} / ${setCount} / ${weight} / ${time}`;

  // 로컬 스토리지에 저장
  const storedPrograms = JSON.parse(localStorage.getItem("programs")) || {};
  if (!storedPrograms[day]) {
    storedPrograms[day] = [];
  }
  storedPrograms[day].push(programEntry);

  localStorage.setItem("programs", JSON.stringify(storedPrograms));

  // program.html로 이동
  window.location.href = "program.html";





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


// 운동 프로그램 저장 API
app.post("/save-program", (req, res) => {
  const { day, exercise, count, setCount, weight, time } = req.body;

  // 운동 부위별 세트수 업데이트
  let bodyPartSets = {
    chest: 0,
    back: 0,
    frontShoulder: 0,
    sideShoulder: 0,
    rearShoulder: 0,
    biceps: 0,
    triceps: 0,
    abs: 0,
    quads: 0,
    glutes: 0,
    hamstrings: 0,
    calf: 0,
  };

  // 운동 목록에서 해당 운동의 부위별 세트 수 계산
  if (muscle_activation_data[exercise]) {
    const muscleData = muscle_activation_data[exercise];

    Object.keys(muscleData).forEach((muscle) => {
      bodyPartSets[muscle] += muscleData[muscle] * setCount;
    });
  }

   // 로그인된 사용자의 세션 정보 확인
   const username = req.session.user ? req.session.user.username : null;
   if (!username) {
     return res.status(401).json({ message: "로그인이 필요합니다." });
   }
  
  let user = users.find((user) => user.username === username);

  if (!user) {
    user = { username, bodyPartSets: {} };
    users.push(user);
  }

  // 해당 날의 운동 세트수 추가
  if (!user.bodyPartSets[day]) {
    user.bodyPartSets[day] = { ...bodyPartSets };
  } else {
    Object.keys(bodyPartSets).forEach((bodyPart) => {
      user.bodyPartSets[day][bodyPart] += bodyPartSets[bodyPart];
    });
  }

  res.status(200).json({ message: "운동 프로그램 저장 완료!", bodyPartSets: user.bodyPartSets[day] });
});


// 운동 삭제 후 근육 활성화 데이터 업데이트 API
router.post("/update-muscle-activations", (req, res) => {
  const { day, exercise, setCount } = req.body;
  const username = req.session.user.username;

  if (!day || !exercise || !setCount) {
    return res.status(400).json({ message: "Invalid data." });
  }

  const muscleActivation = muscle_activation_data[exercise];
  if (!muscleActivation) {
    return res.status(400).json({ message: "Unknown exercise." });
  }

  // muscleActivations 객체에서 해당 운동의 근육 활성도 감소
  if (muscleActivations[username] && muscleActivations[username][day]) {
    Object.keys(muscleActivation).forEach((muscle) => {
      muscleActivations[username][day][muscle] =
        (muscleActivations[username][day][muscle] || 0) - muscleActivation[muscle] * setCount;
    });
  }

  // totalMuscleActivations 객체에서 해당 운동의 부위별 총합 감소
  if (totalMuscleActivations[username]) {
    Object.keys(muscleActivation).forEach((muscle) => {
      totalMuscleActivations[username][muscle] =
        (totalMuscleActivations[username][muscle] || 0) - muscleActivation[muscle] * setCount;
    });
  }

  res.status(200).json({ success: true });
});