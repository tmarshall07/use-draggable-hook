import React from "react";
import logo from "./logo.svg";
import "./App.css";
import useDrag from "./useDrag";
import { useRef, useState } from "react";

function App() {
  const divRef = useRef();

  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  const handleDrag = (e) => {
    setTranslate({
      x: translate.x + e.movementX,
      y: translate.y + e.movementY
    });
  };

  const drag = useDrag(divRef, [translate], {
    onDrag: handleDrag,
  });

  return (
    <div className="App">
      <header className="App-header">
        <div
          ref={divRef}
          style={{
            transform: `translateX(${translate.x}px) translateY(${translate.y}px)`
          }}
        >
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        {!drag.isDragging && <p>Drag it ☝️</p>}
        {drag.isDragging && <p>Ooh such drag 😎</p>}
      </header>
    </div>
  );
}

export default App;
