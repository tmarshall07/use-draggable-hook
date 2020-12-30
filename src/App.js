import logo from './logo.svg';
import './App.css';
import useDraggable from './useDraggable';
import { useRef, useState } from 'react';

function App() {
  const divRef = useRef();

  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  console.log(translate)
  const handleDrag = (e) => {
    setTranslate({
      x: translate.x + e.movementX,
      y: translate.y + e.movementY,
    });
  }

  useDraggable(divRef, [translate], {
    onDrag: handleDrag,
    onMouseDown: () => console.log('Moving')
  });

  return (
    <div className="App">
      <header className="App-header">
        <div ref={divRef} style={{ transform: `translateX(${translate.x}px) translateY(${translate.y}px)`}} >
          <img  src={logo} className="App-logo" alt="logo" />
        </div>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
