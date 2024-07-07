import { useEffect, useState } from "react";

function NetworkPingMonitor() {
  const [ping, setPing] = useState(0);

  useEffect(() => {
    const startTime = performance.now();

    // Ping a known reliable server
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then(() => {
        const endTime = performance.now();
        const pingTime = endTime - startTime;
        setPing(pingTime.toFixed(2));
      })
      .catch((error) => {
        console.error("Error measuring ping:", error);
      });
  }, []);

  return (
    <div>
      <h2>Network Ping</h2>
      <p>Ping Time: {ping} ms</p>
    </div>
  );
}

export default NetworkPingMonitor;
