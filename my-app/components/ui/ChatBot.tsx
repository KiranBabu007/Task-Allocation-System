'use client'

import { useEffect } from 'react';

const ChatBot = () => {
  useEffect(() => {
    const script1 = document.createElement('script');
    script1.src = 'https://cdn.botpress.cloud/webchat/v1/inject.js';
    script1.async = true;
    document.body.appendChild(script1);

    const script2 = document.createElement('script');
    script2.src = 'https://mediafiles.botpress.cloud/61ab2e4f-c7a1-4a91-ac02-48fe005f4a71/webchat/config.js';
    script2.async = true;
    script2.defer = true;
    document.body.appendChild(script2);

    return () => {
      // Clean up the script elements on component unmount
      const chatbotScripts = document.querySelectorAll('script[src^="https://cdn.botpress.cloud/webchat/v1/inject.js"], script[src^="https://mediafiles.botpress.cloud/61ab2e4f-c7a1-4a91-ac02-48fe005f4a71/webchat/config.js"]');
      chatbotScripts.forEach((script) => {
        document.body.removeChild(script);
      });
    };
  }, []);

  return <div id="webchat" />;
};

export default ChatBot;