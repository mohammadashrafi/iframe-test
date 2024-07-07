import { useEffect, useState } from "react";
import { ReactInternetSpeedMeter } from "react-internet-meter";
import "react-internet-meter/dist/index.css";

const InternetMeter = () => {
  const [wifiSpeed, setwifiSpeed] = useState(null);

  useEffect(() => {
    console.log({ wifiSpeed });
  }, [wifiSpeed]);
  return (
    <>
      <ReactInternetSpeedMeter
        txtSubHeading="Internet is too slow"
        outputType="alert"
        customClassName={null}
        txtMainHeading="Opps..."
        pingInterval={4000} // milliseconds
        thresholdUnit="megabyte" // "byte" , "kilobyte", "megabyte"
        threshold={100}
        imageUrl="https://res.cloudinary.com/dcwxsms2l/image/upload/v1610376487/pexels-ivan-samkov-6291574_bzqgps.jpg"
        downloadSize="1781287" //bytes
        callbackFunctionOnNetworkDown={(speed) =>
          console.log(`Internet speed is down ${speed}`)
        }
        callbackFunctionOnNetworkTest={(speed) => setwifiSpeed(speed)}
      />
    </>
  );
};

export default InternetMeter;
