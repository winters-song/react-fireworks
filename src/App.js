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

  useEffect(() => {
    setTimeout(() => {
      fireworks.current.start()
    }, 1000)

    setTimeout(() => {
      fireworks.current.stop()
    }, 1000 * 10)

  }, [fireworks])

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
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <div ref={fireworksWrapper} style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}>
        <Fireworks ref={fireworks} width={width} height={height}/>
      </div>
    </div>
  );
}

export default App;
