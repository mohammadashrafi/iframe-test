import  { useEffect, useRef } from 'react';

const ParentComponent = () => {
  const iframeRef = useRef(null);

  useEffect(() => {
 

    // Listen for messages from the iframe
 

    // Send a message to the iframe after it has loaded
    const iframe:any = iframeRef.current;
    if (iframe) {
      iframe.onload = () => {
        iframe.contentWindow.postMessage('fg4hf5g4h5f4gh564f6g54hd6f54g56df4g654', 'https://next-auth-session.vercel.app/');
      };
    }

    
  
  }, []);

  return (
    <div>
      <h1>Parent Component</h1>
      <iframe
      
        ref={iframeRef}
        src="https://next-auth-session.vercel.app/"
        title="Communication Iframe"
        style={{ width: '600px', height: '400px', border: 'none' }}
      ></iframe>
    </div>
  );
};

export default ParentComponent;