import React, { useState, useEffect } from 'react';

interface TerminalLineProps {
  text: string;
  delay?: number;
  onFinished?: () => void;
}

const TerminalLine: React.FC<TerminalLineProps> = ({ text, delay = 0, onFinished }) => {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    let timeoutId: number;
    
    const startTyping = () => {
        setDisplayText('');
        let i = 0;
        const typingInterval = setInterval(() => {
          if (i < text.length) {
            setDisplayText(prev => prev + text.charAt(i));
            i++;
          } else {
            clearInterval(typingInterval);
            if (onFinished) onFinished();
          }
        }, 60);
    }
    
    if (delay > 0) {
        timeoutId = setTimeout(startTyping, delay);
    } else {
        startTyping();
    }
    
    return () => clearTimeout(timeoutId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, delay]);

  return (
    <p className="whitespace-pre-wrap">{displayText}</p>
  );
};

export default TerminalLine;