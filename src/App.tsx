// import { useRef } from 'react'
import './App.css'
// import CryptoJS from "crypto-js"
import ParentComponent from "./components/postMessage"
function App() {
// const myref=useRef<HTMLIFrameElement>(null)
// const handelClick=()=>{
//   if (myref.current) {
//     if (myref.current.contentWindow) {
//       myref.current.contentWindow.postMessage(
//         '8erEGs0Th0cPC4zKKgi26zoCtABhGHy08eUCISYGEgk',
//         'https://next-auth-session.vercel.app'
//       );
//     } else {
//       console.error('myref.current.contentWindow is null');
//     }
//   } else {
//     console.error('myref.current is null');
//   }
// }

// const obj={
//   name:"mohammad",lastname:"ashrafi",age:30
// }
// const secretkey="df5g4df564654d56fg54"

// const encryptFormData = (data:string | object, key:string) => {
//   const jsonString = JSON.stringify(data);
//   const encryptedString:string = CryptoJS.AES.encrypt(jsonString, key).toString();
//   return encryptedString;
// };


// const decryptFormData = (encryptedString:string, key:string) => {
//   const bytes = CryptoJS.AES.decrypt(encryptedString, key);
//   const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
//   return JSON.parse(decryptedString);
// };




// const handelCript =async()=>{
//   const encryptForm= await encryptFormData(obj,secretkey)
//   const decript=await decryptFormData(encryptForm,secretkey)

//   console.log("encryptFormData",encryptForm)
//   console.log("decript",decript)
// }



  return (
    <>
  <ParentComponent/>
     {/* <iframe ref={myref} src="https://next-auth-session.vercel.app" sandbox="allow-storage-access-by-user-activation
                 allow-scripts
                 allow-same-origin" width={"80%"} height={"400px"} title="Iframe Example" className='m-auto border border-6 border-red-950 '></iframe>
     <button onClick={handelClick} className='bg-red-500 p-3 mt-4 rounded-md text-white'>click</button>
     <br />
     <a className='bg-green-500 block w-[100px] mx-auto p-3 mt-4 rounded-md text-white' href="https://next-auth-session.vercel.app/redirect">redirect</a>
     <button onClick={handelCript} className="bg-purple-500 p-4 mt-3 text-white">crp</button> */}
    </>
  )
}

export default App
