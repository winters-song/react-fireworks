import logo from './logo.svg';
import './App.css';
import Fireworks from './effect/Fireworks'
import React, {useRef, useState, useEffect} from 'react'
function App() {

  const [width, setWidth] = useState()
  const [height, setHeight] = useState()
  let fireworksWrapper = useRef()
  let fireworks = useRef()

  let timer
  const resize = function() {
    timer && clearTimeout(timer)

    timer = setTimeout(() => {
      if(width !== fireworksWrapper.current.offsetWidth || height !== fireworksWrapper.current.offsetHeight){
        setWidth(fireworksWrapper.current.offsetWidth)
        setHeight(fireworksWrapper.current.offsetHeight)
      }
    }, 200);
  }
  // 初始化宽高
  useEffect(() => {
    setWidth(fireworksWrapper.current.offsetWidth)
    setHeight(fireworksWrapper.current.offsetHeight)
  }, [fireworksWrapper])

  const startHandler = () => {
    fireworks.current.start()
  }
  const stopHandler = () => {
    fireworks.current.stop()
  }

  useEffect(() => {
    window.addEventListener('resize', () => {
      resize()
    })
  }, [])
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button type="button" onClick={startHandler} >
          Start
        </button>

        <button type="button" onClick={stopHandler} >
          Stop
        </button>

        {/* Fireworks Layer */}
        <div ref={fireworksWrapper} style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}>
          <Fireworks ref={fireworks} width={width} height={height}/>
        </div>
      </header>
    </div>
  );
}

export default App;
