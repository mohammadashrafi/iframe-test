/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const fs = require("fs");
const multer = require("multer");
const uuid = require("uuid").v4;
const app = express();
const port = 6005;
const cors = require("cors");
app.get("/download-speed-test", (req, res) => {
  const filePath = "../public/uploads/large-file.zip";
  const file = fs.createReadStream(filePath); // Ensure this file exists and is large enough for testing
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Content-Disposition", "attachment; filename=large-file.zip");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3009");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  file.pipe(res);
  res.status(200).send("");
});
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

app.post("/upload-speed-test", (req, res) => {


  const startTime = Date.now();
  console.log(`start Upload ${startTime} milliseconds.`);
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "../public/uploads/");
    },
    filename: (req, file, cb) => {
      console.log(file);
      cb(null, `${uuid()}_${file.originalname}`);
    },
  });

  // const fileFilter = (req, file, cb) => {
  //     if (file.mimetype == "image/jpeg") {
  //         cb(null, true);
  //     } else {
  //         cb("تنها پسوند JPEG پشتیبانی میشود", false);
  //     }
  // };

  const upload = multer({
    // limits: { fileSize: 4000000 },
    dest: "uploads/",
    storage: storage,
    // fileFilter: fileFilter,
  }).single("image");

  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      const endTime = Date.now();
      const elapsedTime = endTime - startTime;
      console.log(`Upload took ${elapsedTime} milliseconds.`);
      res
        .status(200)
        .send({ message: "Upload complete.", timeTaken: elapsedTime });
    }
  });
});

app.get("/ping-endpoint", (req, res) => {
  res.send("Ping!");
});
