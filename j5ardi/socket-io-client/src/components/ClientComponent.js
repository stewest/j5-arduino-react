import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

require('dotenv').config();

export default function ClientComponent() {
  const [light, setLight] = useState('');
  const [led, setLed] = useState('');
  const [temp, setTemp] = useState('');
  const [changedLED, toggleLED] = useState('');

  const ENDPOINT = process.env.REACT_APP_ENDPOINT;

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    socket.on('FromLight', (data) => {
      setLight(data);
    });

    socket.on('FromLed', (data) => {
      setLed(data);
    });

    socket.on('FromTemp', (data) => {
      setTemp(data);
    });

    socket.emit('handleLED', changedLED);
  }, [ENDPOINT, changedLED]);

  let lightVar = 'OFF';
  let luminosity;
  let lightNumb;
  let ledStatus = false;
  let temperatureC;
  let temperatureF;
  let temperatureK;

  if (light.item === 'light') {
    lightVar = light.msg;
    lightNumb = 100 - parseFloat(lightVar / 10.24).toFixed(0);
    luminosity = lightNumb;
  }

  let divStyle = {
    height: luminosity + '%',
  };

  if (led.item === 'led') {
    ledStatus = led.msg;
  }

  if (temp.c || temp.f || temp.k) {
    temperatureC = parseFloat((temp.c / 23).toFixed(1));
    //temperatureF = parseFloat((temp.f / 23).toFixed(1));
    temperatureK = parseFloat((temperatureC + 273.15).toFixed(1));
    temperatureF = parseFloat((temperatureC * 9) / 5 + 32).toFixed(1);
  }

  function handleLED() {
    toggleLED((prevState) => !prevState);
  }

  return (
    <div className="grid">
      <div className="item light">
        <span>Light: {lightNumb}</span>
        <div className="light-fill" style={divStyle}>
          &nbsp;
        </div>
        <div className="light-bottom">&nbsp;</div>
      </div>

      <div className="item led">
        LEDs: {ledStatus ? 'ON' : 'OFF'}
        {ledStatus ? (
          <div className="led-red is-on"></div>
        ) : (
          <div className="led-red"></div>
        )}
        {ledStatus ? (
          <div className="led-green is-on"></div>
        ) : (
          <div className="led-green"></div>
        )}
        {ledStatus ? (
          <div className="led-blue is-on"></div>
        ) : (
          <div className="led-blue"></div>
        )}
        <button className="toggle-led" onClick={handleLED}>
          Toggle LED
        </button>
      </div>

      <div className="item temp">
        <h3>TEMP:</h3>
        <br />
        {temperatureC} 'C / {temperatureF} 'F / {temperatureK} 'K
      </div>
    </div>
  );
}
