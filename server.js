const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// 사용자 데이터를 저장할 간단한 배열 (데이터베이스 역할)
let users = [];

// 미들웨어 설정
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 정적 파일 제공 (HTML, CSS, JS)
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/signup.html");
});

// 회원가입 라우트
app.post("/register", (req, res) => {
  const { id, password } = req.body;
  // 간단한 유효성 검사
  if (!id || !password) {
    return res.status(400).json({ message: "ID와 Password를 입력하세요." });
  }

  // 중복 체크
  const userExists = users.some((user) => user.id === id);
  if (userExists) {
    return res.status(400).json({ message: "이미 존재하는 ID입니다." });
  }

  // 사용자 저장
  users.push({ id, password });
  res.json({ message: "회원가입 성공!" });
});

// 로그인 라우트
app.post("/login", (req, res) => {
  const { id, password } = req.body;
  const user = users.find(
    (user) => user.id === id && user.password === password
  );
  if (!user) {
    return res
      .status(401)
      .json({ message: "ID 또는 Password가 올바르지 않습니다." });
  }

  res.json({ message: "로그인 성공!" });
});

// 서버 시작
app.listen(3000, () => {
  console.log("서버가 http://localhost:3000 에서 실행 중입니다.");
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
