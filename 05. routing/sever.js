import http from "http";

const server = http.createServer((req, res) => {
  res.setHeader("Content-type", "text/plain");

  // req.url: 요청 경로
  // req.method: 요청 방식
  const { url, method } = req;

  if (method === "GET" && url === "/home") {
    res.write("HOME");
    res.end();
  } else if (method === "GET" && url === "/about") {
    res.end("ABOUT");
  } else {
    res.end("Not Found");
  }

});

// server 싦행 (port 번호)
server.listen(3000, () => {
  console.log("서버가 실행 중");
});