import http from "http";

const server = http.createServer((req, res) => {
  // console.log(req);

  // res를 이용하여 화면에 txt 출력
  res.setHeader("Content-type", "text/plain");
  res.write("Hello Node");
  res.end();
})

// server 싦행 (port 번호)
server.listen(3000, () => {
  console.log("서버가 실행 중");
});