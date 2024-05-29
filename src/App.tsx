import { useRef } from 'react'
import './App.css'

function App() {
const myref=useRef<HTMLIFrameElement>(null)
const handelClick=()=>{
  myref.current.contentWindow.postMessage('8erEGs0Th0cPC4zKKgi26zoCtABhGHy08eUCISYGEgk', 'https://next-auth-session.vercel.app')
}

  return (
    <>
  
     <iframe ref={myref} src="https://next-auth-session.vercel.app" width={"80%"} height={"400px"} title="Iframe Example" className='m-auto border border-6 border-red-950 '></iframe>
     <button onClick={handelClick} className='bg-red-500 p-3 mt-4 rounded-md text-white'>click</button>
    </>
  )
}

export default App
