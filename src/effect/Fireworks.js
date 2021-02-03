import React, {forwardRef, useRef, useState, useImperativeHandle} from 'react'
import { loop } from "./loop";

function Fireworks(props, ref) {
  let {
    MAX_ROCKETS = 5,
    MAX_PARTICLES = 500,
    width,
    height
  } = props

  let canvas = useRef()
  let canvasBuffer = useRef()
  let dataRef = useRef()
  const [opacity, setOpacity] = useState(0)

  useImperativeHandle(ref, () => ({
    start() {

      if (dataRef.current) {
        console.log('Looks like this element is already started!');
        return;
      }
      
      let data = {
        canvas: canvas.current,
        context: canvas.current.getContext('2d'),
        canvasBuffer: canvasBuffer.current,
        contextBuffer: canvasBuffer.current.getContext('2d'),
        particles: [],
        rockets: [],
        MAX_ROCKETS,
        MAX_PARTICLES
      };

      // data.interval = setTimeout(loop.bind(this, data), 1000 / 50);
      data.interval = setInterval(loop.bind(this, data), 1000 / 50);
      dataRef.current = data

      setOpacity(1)
    },

    stop() {
      if (!dataRef.current) {
        console.log('Looks like this element is not yet started!');
        return;
      }
      setOpacity(0)

      setTimeout(() => {
        clearInterval(dataRef.current.interval);
        dataRef.current = null
      }, 1000)
    }
  }))

  return(
    <>
      <canvas ref={canvas} style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        opacity: opacity, 
        transition: "opacity 1s"
      }}
      width={width} height={height} 
      />
      <canvas ref={canvasBuffer} width={width} height={height} style={{display:'none'}}/>
    </>
  )

}

export default React.memo(forwardRef(Fireworks))