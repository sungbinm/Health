function isLoggedIn(req, res, next) {
  if (!req.session.user) {
    return res
      .status(401)
      .json({ success: false, message: "로그인이 필요합니다." });
  }
  next();
}

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const path = require("path");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User"); // User 모델 가져오기
const Program = require("./models/Program"); // 새 모델을 import

const app = express();
const PORT = 3000;

// MongoDB URI (로컬에서 실행하는 경우 'mongodb://localhost:27017/health')
const mongoURI = "mongodb://localhost:27017/health";

// MongoDB 연결
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("MongoDB 연결 성공!");
  })
  .catch((err) => {
    console.error("MongoDB 연결 실패", err);
  });

// 미들웨어 설정
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(
  cors({
    origin: "http://localhost:3000", // 클라이언트 주소
    credentials: true, // 쿠키 포함
  })
);

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // 로컬에서는 false (production에서는 true로 변경)
      httpOnly: true,
    },
  })
);

// 정적 파일 서빙 (public 폴더의 파일을 제공)
app.use(express.static(path.join(__dirname, "public")));

// 기본 경로 처리
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "main.html"));
});

// 회원가입 API
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    // 중복 확인
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "이미 사용 중인 아이디입니다." });
    }

    // 비밀번호 암호화
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 사용자 저장
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "회원가입 성공!" });
  } catch (error) {
    console.error("회원가입 오류", error);
    res.status(500).json({ message: "회원가입 실패" });
  }
});

// 로그인 API
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(401)
        .json({ message: "아이디 또는 비밀번호가 틀렸습니다." });
    }

    // 비밀번호 비교
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "아이디 또는 비밀번호가 틀렸습니다." });
    }

    req.session.user = user; // 세션에 사용자 정보 저장 (username 외에도 모든 사용자 정보 저장 가능)
    res.status(200).json({ message: "로그인 성공!", username });
  } catch (error) {
    console.error("로그인 오류", error);
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

// 로그인 여부 확인 미들웨어
function isLoggedIn(req, res, next) {
  if (!req.session.user) {
    return res
      .status(401)
      .json({ success: false, message: "로그인이 필요합니다." });
  }
  next();
}

// 운동 프로그램 저장 API
app.post("/save-program", isLoggedIn, async (req, res) => {
  const { username } = req.session.user;
  const { day, exercise, count, setCount, weight, time } = req.body;

  console.log("받은 데이터:", req.body); // 클라이언트에서 전달한 데이터 확인

  try {
    const newProgram = new Program({
      username,
      day,
      exercise,
      count,
      setCount,
      weight,
      time,
    });

    await newProgram.save();

    console.log("프로그램 저장됨:", newProgram); // 서버 로그에 저장된 프로그램 확인
    res.json({ success: true, message: "Program saved successfully!" });
  } catch (error) {
    console.error("운동 프로그램 저장 오류", error); // 오류 로그 출력
    res
      .status(500)
      .json({ message: "운동 프로그램 저장 실패", error: error.message });
  }
});

// 운동 프로그램 조회 API
app.get("/get-programs", isLoggedIn, async (req, res) => {
  const { username } = req.session.user;

  try {
    // 사용자별 프로그램 데이터 조회
    const programs = await Program.find({ username });

    res.json(programs); // 프로그램 데이터 반환
  } catch (error) {
    console.error("프로그램 조회 오류", error);
    res.status(500).json({ message: "프로그램 조회 실패" });
  }
});

// 운동 프로그램 삭제 API
app.post("/delete-program", isLoggedIn, async (req, res) => {
  const { username } = req.session.user;
  const { day, index } = req.body;

  try {
    await Program.deleteOne({ username, day, _id: index }); // MongoDB에서 삭제

    res.json({ success: true, message: "Program deleted successfully!" });
  } catch (error) {
    console.error("프로그램 삭제 오류", error);
    res.status(500).json({ message: "프로그램 삭제 실패" });
  }
});

// 운동 루틴 관련 라우트 사용
const workoutRoutes = require("./workoutRoutes");
app.use("/workouts", workoutRoutes);

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
