const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const path = require("path");

const app = express();
const PORT = 3000;

// 미들웨어 설정
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(
  cors({
    origin: "http://localhost:3000", // 클라이언트 URL
    credentials: true, // 쿠키 허용
  })
);

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

// 정적 파일 서빙 (public 폴더의 파일을 제공)
app.use(express.static(path.join(__dirname, "public")));

// 기본 경로 처리
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "main.html"));
});

// 임시 사용자 데이터베이스
let users = [];

// 회원가입 API
app.post("/signup", (req, res) => {
  const { username, password } = req.body;

  // 중복 확인
  if (users.find((user) => user.username === username)) {
    return res.status(400).json({ message: "이미 사용 중인 아이디입니다." });
  }

  // 사용자 등록
  users.push({ username, password });
  res.status(201).json({ message: "회원가입 성공!" });
});

// 로그인 API
app.post("/login", (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "아이디와 비밀번호를 입력하세요." });
    }

    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (!user) {
      return res
        .status(401)
        .json({ message: "아이디 또는 비밀번호가 틀렸습니다." });
    }

    req.session.user = { username }; // 세션에 사용자 정보 저장
    res.status(200).json({ message: "로그인 성공!", username });
  } catch (error) {
    console.error("로그인 에러:", error.message);
    res.status(500).json({ message: "서버 오류 발생" });
  }
});

// 로그아웃 API
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "로그아웃 실패" });
    }
    res.status(200).json({ message: "로그아웃 성공" });
  });
});

// 로그인 상태 확인 API
app.get("/check-session", (req, res) => {
  if (req.session.user) {
    res
      .status(200)
      .json({ message: "로그인됨", username: req.session.user.username });
  } else {
    res.status(401).json({ message: "로그인되지 않음" });
  }
});

// 운동 루틴 관련 라우트 사용
const workoutRoutes = require("./workoutRoutes");
app.use("/workouts", workoutRoutes); // 박준후가 수정

// 서버 실행
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT}에서 실행 중입니다.`);
});

//현재 상태 : node.js 프레임워크 express로 로그인 회원가입을 위한 서버구성
// 사용자 데이터 저장을 할 배열을 선언
// 클라이언트: 사용자로부터 데이터를 입력받고 서버에 요청을 보내며, 요청 결과(응답)을 사용자에게 보여줌.
// 서버: 클라이언트로부터 요청받은 데이터를 처리, 데이터 저장 및 비즈니스 로직 , 처리 결과를 클라이언트로 응답.
// 회원가입 라우트: /register
// post 메서드를 사용하여 클라이언트가 데이터를 서버로 보냄, 경로 /register
// req.body 에 클라이언트가 보낸 데이터 포함 -> id와 password 추출
// 유효성검사로 ID 칸과 PassWord 칸이 비었는지 확인
// 이미 같은 ID 가 있는지 중복 체크
// 사용자 데이터 저장

// 로그인 라우트: /login
// 마찬가지로 데이터 받고 find 메서드를 활용해 사용자 데이터 확이
// 사용자가 없을 경우 처리
// 로그인 성공
