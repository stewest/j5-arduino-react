require('dotenv').config();
// const token = process.env['SLACK_TOKEN'];
// const userToken = process.env['SLACK_USER'];

const five = require("johnny-five");
const board = new five.Board();

board.on("ready", function() {
  // I've put 3 separate LEDs on Digital pins 3 Blue, 5 Green, 6 Red.
  // And a rgb LED, controlled by 9, 10 , 11.
  const rgb = new five.Led.RGB([9, 10, 11]);

  // Create a new `photoresistor` hardware instance on Analog 2.
  const photoresistor = new five.Sensor({
    pin: "A2",
    freq: 5000
  });

  // Inject the `sensor` hardware into
  // the Repl instance's context;
  // allows direct command line access
  board.repl.inject({
    pot: photoresistor
  });

  // "data" get the current reading from the photoresistor
  photoresistor.on("data", () => {
    console.log(photoresistor.value);
  });

  let index = 0;
  const rainbow = ["FF0000", "FF7F00", "FFFF00", "00FF00", "0000FF", "4B0082", "8F00FF"];
  const rgbOn = new five.Leds([12]);
  const array = new five.Leds([3, 5, 6]);
  const blue = new five.Leds([3]);
  const green = new five.Leds([5]);
  const red = new five.Leds([6]);
  const deployComplete = new five.Leds([3, 5]);

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
  }

  /**
   *
   * @param {*} colour
   * usage example: pulseLed(green);
   */
  const pulseLed = function (colour) {
    colour.pulse();

    setTimeout(function () {
      colour.stop().off();
    }, 5000);
  }

  // Turn on Rainbow.
  // To turn off: array.stop().off();
  rainbox();

  pulseLed(array);
});
