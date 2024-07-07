import { useRef } from "react";
import "./App.css";
import SpeedTests from "./components/CloudflareSpeedTest";

function App() {
  const fileInput = useRef<any>(null);

  async function measurePing() {
    const startTime = performance.now();
    const response = await fetch("http://localhost:6005/ping-endpoint");
    const endTime = performance.now();
    const duration = endTime - startTime;
    console.log(`Approximate ping time: ${duration / 1000} milliseconds.`);
    return response;
  }

  async function testUploadSpeed() {
    const startTime = performance.now();
    const formData = new FormData();
    formData.append("image", fileInput.current?.files[0]); // Assuming fileInput is a File input element
    const response = await fetch("http://localhost:6005/upload-speed-test", {
      method: "POST",
      body: formData,
    });
    const endTime = performance.now();
    const duration = endTime - startTime;
    const data = await response.json();
    console.log(
      `Upload speed test took ${duration / 1000} milliseconds.`,
      data.timeTaken
    );
    return data;
  }

  async function testDownloadSpeed() {
    const startTime = performance.now();
    const response = await fetch("http://localhost:6005/download-speed-test");
    console.log("testDownloadSpeed responce", response);
    const endTime = performance.now();
    const duration = endTime - startTime;
    console.log(`Download speed test took ${duration / 1000} milliseconds.`);
    return response;
  }

  async function handeltest() {
    // const allDate=await Promise.allSettled([testUploadSpeed(),measurePing(),testDownloadSpeed()])

    try {
      const pingArr = [1, 2, 3];

      const n = 100; // Number of elements
      const arr = [];
      for (let i = 0; i < n; i++) {
        arr.push(i + 1);
      }
      // const countPost = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

      const getPing = await pingArr.forEach(() => measurePing());
      console.log({ getPing });

      const getupload = await pingArr.forEach(() => testUploadSpeed());
      console.log({ getupload });

      const getdownload = await arr.forEach(() => testDownloadSpeed());
      console.log({ getdownload });

      // const pingTest = await measurePing();
      // const uploadTest = await testUploadSpeed();
      // const downloadTest = await testDownloadSpeed();
      // console.log({ pingTest, uploadTest, downloadTest });
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <>
    <SpeedTests/>
      {/* <input type="file" name="file" ref={fileInput} />

      <button className="bg-red-700 p-5 text-white" onClick={handeltest}>
        analize
      </button> */}
      {/* <NetworkPingMonitor/> */}

      {/* <InternetMeter /> */}

      {/* <ParentComponent/>
  <button onClick={handelCript} className="bg-purple-500 p-4 mt-3 text-white">crp</button> */}
      {/* <iframe ref={myref} src="https://next-auth-session.vercel.app" sandbox="allow-storage-access-by-user-activation
                 allow-scripts
                 allow-same-origin" width={"80%"} height={"400px"} title="Iframe Example" className='m-auto border border-6 border-red-950 '></iframe>
     <button onClick={handelClick} className='bg-red-500 p-3 mt-4 rounded-md text-white'>click</button>
     <br />
     <a className='bg-green-500 block w-[100px] mx-auto p-3 mt-4 rounded-md text-white' href="https://next-auth-session.vercel.app/redirect">redirect</a>
     <button onClick={handelCript} className="bg-purple-500 p-4 mt-3 text-white">crp</button> */}
    </>
  );
}

export default App;
