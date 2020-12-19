# Johnny Five Node JS server with Socket.io connecting Arduino to React
A NodeJS Arduino play play with React webpage.

I wanted to make my Arduino flash certain green or red LEDs, triggered by certain sensors and then show that in a React app.

Creating a Mashup of:

- https://github.com/rwaldron/johnny-five


- https://www.valentinog.com/blog/socket-react/
## What to do:

    From https://github.com/rwaldron/johnny-five#setup-and-assemble-arduino
    - Download Arduino IDE
    - Plug in your Arduino or Arduino compatible microcontroller via USB
    - Open the Arduino IDE, select: File > Examples > Firmata > StandardFirmataPlus
        -- StandardFirmataPlus is available in Firmata v2.5.0 or greater
    - Click the "Upload" button.

If the upload was successful, the board is now prepared and you can close the Arduino IDE.

Then each from their own terminal:

    Terminal 1:
    - cd socket-io-server
    - yarn install
    - node app.js

    Terminal 2:
    - cd socket-io-client
    - yarn install
    - yarn start

While developing, as the client and server use specific ports, you may need to stop of all nodes and restart.
- `killall -9 node` in the socket-io-server folder and restart both the server `node app.js` and `yarn start` the client.

## What does it do?
- You should see a Socket.io Button, that temporarily stops the client from connecting to the socker server.
- There is a "light" sensor showing the amount of light data from from the photo resistor.
- When the Arduino board first starts it has some LEDs flashing. The LED status is shown as on or off.

## References:
- http://johnny-five.io/api/led.rgb/
- http://johnny-five.io/examples/photoresistor/
- https://stackabuse.com/using-global-variables-in-node-js/
- https://www.valentinog.com/blog/socket-react/
- https://socket.io/docs/v3/index.html
