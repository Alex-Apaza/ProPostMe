'use client';

import { useEffect } from 'react';

const ElevenLabsWidget = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
    script.async = true;
    script.type = 'text/javascript';
    document.body.appendChild(script);
  }, []);

  return (
    <div
      id="elevenlabs-widget-container"
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 9999,
      }}
      dangerouslySetInnerHTML={{
        __html: '<elevenlabs-convai agent-id="SfmeS5JZdBv223WwjefT"></elevenlabs-convai>',
      }}
    />
  );
};

export default ElevenLabsWidget;
