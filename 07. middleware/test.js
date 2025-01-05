import { createServer } from "node:http";

const server = createServer((req, res) => {
  console.log("request received");
});

server.listen(3000, () => {
  console.log("server started");
});
