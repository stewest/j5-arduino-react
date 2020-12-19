import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

require('dotenv').config();

export default function ClientComponent() {
  const [light, setLight] = useState("");
  const [led, setLed] = useState("");

  const ENDPOINT = process.env.REACT_APP_ENDPOINT;

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    socket.on("FromLight", (data) => {
      setLight(data);
    });

    socket.on("FromLed", (data) => {
      setLed(data);
    });

  }, [ENDPOINT]);

  let lightVar = 'OFF';
  let ledStatus = 'OFF';

  if (light.item === 'light') {
    lightVar = light.msg;
  }

  if (led.item === 'led') {
    ledStatus = led.msg;
  }

  return (
    <>
      <div className="light">
        Light: {lightVar}
      </div>
      <div className="led">
        LED: {ledStatus}
      </div>
    </>
  );
}
