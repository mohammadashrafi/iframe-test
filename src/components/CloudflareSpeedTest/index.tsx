/* eslint-disable valid-typeof */
import SpeedTest from "@cloudflare/speedtest";
import { useEffect, useState } from "react";
import ReactSpeedometer from "react-d3-speedometer";
import { formatBytes } from "../convertbyte/convertbyte";
const SpeedTests = () => {
  const [getDownload, setDownload] = useState(0);
  const [getUpload, setUpload] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("get down", getDownload);
  }, [getDownload, setDownload]);
  const engine = new SpeedTest({
    autoStart: false,
    loadedLatencyMaxPoints: 10,
    estimatedServerTime: 5,
    measurements: [
      { type: "latency", numPackets: 1 }, // initial latency estimation
      { type: "latency", numPackets: 10 },
      { type: "download", bytes: 1e5, count: 1, bypassMinDuration: true }, // initial download estimation
      { type: "download", bytes: 1e5, count: 4 },
      { type: "download", bytes: 1e6, count: 4 },
      { type: "download", bytes: 1e7, count: 3 },
      { type: "download", bytes: 2.5e7, count: 4 },
      { type: "download", bytes: 2.5e8, count: 2 },
      { type: "download", bytes: 1e8, count: 3 },
      { type: "packetLoss", numPackets: 1e3, responsesWaitTime: 3000 },
      { type: "upload", bytes: 1e5, count: 4 },
      { type: "upload", bytes: 1e6, count: 3 },
      { type: "upload", bytes: 1e7, count: 4 },
      { type: "upload", bytes: 2.5e7, count: 4 },
      { type: "upload", bytes: 5e7, count: 3 },
    ],
  });

  engine.onResultsChange = async ({ type }) => {
    setLoading(false);

    if (type === "download" && !engine.isFinished) {
      if (typeof engine.results.getDownLoadedJitter() === "number") {
        console.log("download ", engine.results.getDownLoadedJitter());
        const frmB = formatBytes(engine.results.getDownLoadedJitter());

        setDownload(frmB);
      }
    } else if (type === "upload" && !engine.isFinished) {
      if (typeof engine.results.getUpLoadedJitter() === "number") {
        console.log("get up", engine.results.getUpLoadedJitter());
        const frmB = formatBytes(engine.results.getUpLoadedJitter());
        setUpload(frmB);
      }

      console.log("upload", engine.results?.raw) ;
    } else if (type === "packetLoss" && !engine.isFinished) {
      console.log("packetLoss", !engine.results?.raw);
    } else if (type === "latency" && !engine.isFinished) {
      console.log("latency", !engine.results?.raw);
    } else {
      console.log(type, engine.results?.raw);
    }

    // console.log(type);
  };

  engine.onFinish = (results) => {
    console.log("result", results);
    setLoading(true);
  };

  engine.onError = (e) => console.log(e);

  //   const data = [
  //     {
  //       name: 'Page A',
  //       uv: 4000,
  //       pv: 2400,
  //       amt: 2400,
  //     },
  //     {
  //       name: 'Page B',
  //       uv: 3000,
  //       pv: 1398,
  //       amt: 2210,
  //     },
  //     {
  //       name: 'Page C',
  //       uv: 2000,
  //       pv: 9800,
  //       amt: 2290,
  //     },
  //     {
  //       name: 'Page D',
  //       uv: 2780,
  //       pv: 3908,
  //       amt: 2000,
  //     },
  //     {
  //       name: 'Page E',
  //       uv: 1890,
  //       pv: 4800,
  //       amt: 2181,
  //     },
  //     {
  //       name: 'Page F',
  //       uv: 2390,
  //       pv: 3800,
  //       amt: 2500,
  //     },
  //     {
  //       name: 'Page G',
  //       uv: 3490,
  //       pv: 4300,
  //       amt: 2100,
  //     },
  //   ];
  console.log("is finished", engine.isFinished);
  console.log("engine", engine);
  return (
    <>
      <button
        className="bg-red-500 p-2 text-white"
        onClick={() => {
          setDownload(0);
          setUpload(0);
          engine.play();
        }}
      >
        speed test
      </button>

      <div className="flex justify-center items-center gap-10 my-5">
        <div>
          <ReactSpeedometer
            maxValue={300}
            value={getDownload}
            currentValueText={`${getDownload} Mbp`}
            needleColor="red"
            startColor="green"
            segments={10}
            endColor="blue"

            // textColor={textColor}
          />

          {loading ? (
            <h1 className="border-2 border-red-500 p-4">
              download is {`${getDownload} Mbps`}
            </h1>
          ) : null}
        </div>

        <div>
          <ReactSpeedometer
            maxValue={300}
            value={getUpload}
            currentValueText={`${getUpload} Mbp`}
            needleColor="red"
            startColor="green"
            segments={10}
            endColor="blue"
            // textColor={textColor}
          />

          {loading && (
            <h1 className="border-2 border-red-500 p-4">
              upload is {`${getUpload} Mbps`}
            </h1>
          )}
        </div>
      </div>
      <div className="flex justify-center items-center gap-5">
        <button
          className="bg-green-800 p-4 text-white"
          onClick={() => {
            setDownload(0);
            setUpload(0);
            engine.restart();
          }}
        >
          reset
        </button>
      </div>
      {/* <div className="h-dvh">


      <ResponsiveContainer width="100%" height="60%">
        <LineChart width={500} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
</div> */}
    </>
  );
};

export default SpeedTests;
