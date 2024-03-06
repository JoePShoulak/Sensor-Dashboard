const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");

// serial port stuff
const port = new SerialPort({ path: "COM12", baudRate: 115200 });
const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));

parser.on("data", data => console.log(JSON.parse(data)));
