const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

require('dotenv').config();
const port = process.env['PORT'];
const local = process.env['CORSLOCAL'];

const index = require('./routes/index');
const app = express();

const events = require('events');
const eventEmitter = new events.EventEmitter();

app.use(index);

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    // You may need to change this in .ENV if the client starts on a different port.
    origin: local,
    methods: ['GET', 'POST'],
  },
  maxHttpBufferSize: 1e8,
});

const five = require('johnny-five');
const board = new five.Board();

let interval;

// Init Socket.io.
io.on('connection', (socket) => {
  console.log('New client connected');
  if (interval) {
    clearInterval(interval);
  }

  interval = setInterval(() => getApiAndEmit(socket), 1000);

  socket.on('handleLED', (arg) => {
    console.log('toggleLED', arg);

    // Fire the 'toggleLED' event.
    eventEmitter.emit('toggleLED');
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
    clearInterval(interval);
    socket.off();
  });
});

// https://stackabuse.com/using-global-variables-in-node-js/
global.lightStatus = {};
global.ledStatus = {};
global.tempStatus = {};

function setLight(item, msg) {
  global.lightStatus = {
    item,
    msg,
  };
}

function getLight() {
  return global.lightStatus;
}

function setLED(item, msg) {
  global.ledStatus = {
    item,
    msg,
  };
}

function getLED() {
  return global.ledStatus;
}

function setTEMP(c, f, k) {
  global.tempStatus = {
    c,
    f,
    k,
  };
}

function getTEMP() {
  return global.tempStatus;
}

const getApiAndEmit = (socket) => {
  const light = getLight();
  const led = getLED();
  const temp = getTEMP();

  // Emitting a new message. Will be consumed by the client
  socket.emit('FromLight', light);
  socket.emit('FromLed', led);
  socket.emit('FromTemp', temp);
};

server.listen(port, () => console.log(`Listening on port ${port}`));

// Arduino Johnny 5.
board.on('ready', function () {
  // I've put 3 separate LEDs on Digital pins 3 Blue, 5 Green, 6 Red.
  // And a rgb LED, controlled by 9, 10 , 11.
  const rgb = new five.Led.RGB([9, 10, 11]);

  // Create a new `photoresistor` hardware instance on Analog 2.
  const photoresistor = new five.Sensor({
    pin: 'A2',
    freq: 5000,
  });

  // "data" is the current reading from the photoresistor.
  photoresistor.on('data', () => {
    setLight('light', photoresistor.value);
  });

  let index = 0;
  const rainbow = [
    'FF0000',
    'FF7F00',
    'FFFF00',
    '00FF00',
    '0000FF',
    '4B0082',
    '8F00FF',
  ];
  // Raibow RGA LED
  const rgbOn = new five.Leds([12]);
  // Array of the single LEDs.
  const array = new five.Leds([3, 5, 6]);
  // const blue = new five.Leds([3]);
  // const green = new five.Leds([5]);
  // const red = new five.Leds([6]);

  const rainbox = function () {
    rgbOn.on();

    board.loop(250, () => {
      rgb.color(rainbow[index++]);
      if (index === rainbow.length) {
        index = 0;
      }
    });

    setTimeout(() => {
      rgbOn.off();
    }, 5000);
    console.log('Ended Rainbow');
  };

  /**
   * @param {*} colour
   * usage example: pulseLed(green);
   */
  const pulseLed = function (colour = array) {
    colour.pulse();
    setLED('led', true);

    setTimeout(function () {
      colour.stop().off();
      setLED('led', false);
    }, 5000);
  };

  // Turn on Rainbow at start.
  rainbox();

  // Turn on Array of LEDs at start.
  pulseLed(array);

  //Assign the event handler to an event:
  eventEmitter.on('toggleLED', pulseLed);

  const thermometer = new five.Thermometer({
    controller: 'ANALOG',
    pin: 'A5',
    freq: 2000,
  });

  thermometer.on('change', () => {
    const { celsius, fahrenheit, kelvin } = thermometer;
    setTEMP(celsius, fahrenheit, kelvin);
  });

  board.on('exit', () => {
    // Turn off the rgb LED.
    rgbOn.off();
    // Turn off each led in the array of individual leds.
    array.stop().off();
  });
});
