// preload.js
const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");
const { Chart } = require("@canvasjs/charts");
const { ipcRenderer } = require("electron");

// {  y: 460 }
const tempDataPoints = [];

window.addEventListener("DOMContentLoaded", () => {
  const chart = new Chart("chartContainer", {
    animationEnabled: true,
    theme: "light2",
    title: {
      text: "Temp",
    },
    data: [
      {
        type: "line",
        indexLabelFontSize: 16,
        dataPoints: tempDataPoints,
      },
    ],
  });
});

/*
{
    "temp":16.98669,
    "sat_count":6,
    "lat":47.687,
    "lon":-29.265,
    "mode":"STABLE",
    "alert":false
}
*/
const replaceText = (selector, text) => {
  const element = document.getElementById(selector);
  if (element) element.innerText = text;
};

// All the Node.js APIs are available in the preload process.
const port = new SerialPort({ path: "COM12", baudRate: 115200 });
const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));

fields = ["temp", "sat_count", "lat", "lon", "mode", "alert"];

parser.on("data", data => {
  const objectData = JSON.parse(data);
  try {
    fields.forEach(field => {
      replaceText(field, objectData[field]);
    });
  } catch (error) {
    console.log("something has totally gotten fucked up here.");
  }
});
