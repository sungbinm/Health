const mongoose = require("mongoose");

// 운동 프로그램 스키마 정의
const programSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    day: { type: String, required: true },
    exercise: { type: String, required: true },
    count: { type: Number, required: true },
    setCount: { type: Number, required: true },
    weight: { type: Number, required: true },
    time: { type: Number, required: true },
  },
  { timestamps: true } // 생성일과 수정일 자동 기록
);

// 프로그램 모델 정의
const Program = mongoose.model("Program", programSchema);

module.exports = Program;
