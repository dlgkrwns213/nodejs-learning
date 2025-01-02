import path from "path";
import { fileURLToPath } from "url";

const fullPath = path.join("hi", "hello", "tmp.txt");
console.log(`파일 위치: ${fullPath}`);


const dirPath = path.dirname(fullPath);
console.log(`디렉토리 위치: ${dirPath}`);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(`현재 경로: ${__filename}`);

const filePath = path.join(__dirname, "example.txt");
console.log(`예시 경로: ${filePath}`);