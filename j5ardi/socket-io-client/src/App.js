import React, { useState } from "react";
import './App.css';
import ClientComponent from "./components/ClientComponent";


function App() {
  const [loadClient, setLoadClient] = useState(true);

  return (
    <>
      {/* LOAD OR UNLOAD THE CLIENT */}
      <button onClick={() => setLoadClient(prevState => !prevState)}>
        {loadClient ? 'STOP CLIENT' : 'Start Client'}
      </button>
      {/* SOCKET IO CLIENT*/}
      {loadClient ? <ClientComponent loadClient={loadClient}/> : null}
    </>
  );
}

export default App;
