import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

require('dotenv').config();

export default function ClientComponent() {
  const [light, setLight] = useState("");
  const [led, setLed] = useState("");
  const [temp, setTemp] = useState("");

  const ENDPOINT = process.env.REACT_APP_ENDPOINT;

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    socket.on("FromLight", (data) => {
      setLight(data);
    });

    socket.on("FromLed", (data) => {
      setLed(data);
    });

    socket.on("FromTemp", (data) => {
      setTemp(data);
    });

  }, [ENDPOINT]);

  let lightVar = 'OFF';
  let luminosity;
  let lightNumb;
  let ledStatus = false;
  let temperatureC;
  let temperatureF;

  if (light.item === 'light') {
    lightVar = light.msg;
    lightNumb = parseFloat(lightVar / 6.1).toFixed(2);
    luminosity = lightNumb;
  }

  let divStyle = {
    height: luminosity + '%',
  };

  if (led.item === 'led') {
    ledStatus = led.msg;
  }

  if (temp.c || temp.f) {
    temperatureC = temp.c;
    temperatureF = parseFloat((temp.c * 9 / 5) + 32).toFixed(2);
  }

  return (
    <div className="grid">
      <div className="item light">
        <span>Light: {lightNumb}</span>
        <div className="light-fill" style={divStyle}>&nbsp;</div>
        <div className="light-bottom">&nbsp;</div>
      </div>

      <div className="item led">
        LEDs: {ledStatus ? 'ON':'OFF'}
        {ledStatus ? <div className="led-red is-on"></div> : <div className="led-red"></div> }
        {ledStatus ? <div className="led-green is-on"></div> : <div className="led-green"></div> }
        {ledStatus ? <div className="led-blue is-on"></div> : <div className="led-blue"></div> }
      </div>

      <div className="item temp"><h3>TEMP:</h3><br />
        {temperatureC} 'C / {temperatureF} 'F</div>
    </div>
  );
}
