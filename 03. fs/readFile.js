import fs from "fs";

fs.readFile("./txt.txt", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
})

console.log("!!없는 파일 가져오는 경우 => err 먼저 실행하는 비동기 처리!!");
fs.readFile("./txt2.txt", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
})