/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const { exec } = require("child_process");
// const {lookup} = require("dns");

const app = express();

// Home Route
app.get("/", (req, res) => {
  res.send("Welcome to the Speed Test App!");
});

// Speed Test Route
app.get("/test", (req, res) => {
  // lookup("speedtest.net", (err, address) => {
    // if (err) {
    //   return res.send("Error while looking up DNS.");
    // }

    // console.log(`Resolved IP for speedtest.net: ${address}`);

    exec("speed-test --json", (err, stdout, stderr) => {
      if (err || stderr) {
        return res.send("Error while testing internet speed.");
      }
      res.json({
        speedtest: stdout,
      });
      const result = JSON.parse(stdout);
      const response = `
        <h2>Ping: ${result.ping}</h2>
        <h2>Download Speed: ${result.download}</h2>
        <h2>Upload Speed: ${result.upload}</h2>
      `;
      res.send(response);
    });
  // });
});

// Start the server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
