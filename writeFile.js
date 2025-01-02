import fs from "fs";

fs.readFile("./txt.txt", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    fs.writeFile("./txt3.txt", data, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('txt3.txt is saved');
      }
    })
  }
})
