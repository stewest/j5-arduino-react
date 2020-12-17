# johnny-five-node-with-arduino-react
A NodeJS Arduino play play with React webpage.

I wanted to make my Arduino flash certain green or red LEDs, triggered by certain sensors and then show that on a react app.

Creating a Mashup of:

https://github.com/rwaldron/johnny-five
- The JavaScript Robotics Programming Framework

What to do:

    From https://github.com/rwaldron/johnny-five#setup-and-assemble-arduino
    - Download Arduino IDE
    - Plug in your Arduino or Arduino compatible microcontroller via USB
    - Open the Arduino IDE, select: File > Examples > Firmata > StandardFirmataPlus
        -- StandardFirmataPlus is available in Firmata v2.5.0 or greater
    - Click the "Upload" button.

If the upload was successful, the board is now prepared and you can close the Arduino IDE.

Then from this repo:
- npm install

Run:
- node ardi-app.js

References:
- http://johnny-five.io/api/led.rgb/
- http://johnny-five.io/examples/photoresistor/
