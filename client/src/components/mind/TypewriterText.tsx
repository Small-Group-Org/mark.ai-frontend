import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  delay?: number;
  onComplete?: () => void;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ 
  text, 
  delay = 0, 
  onComplete 
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setIsStarted(true);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!isStarted || currentIndex >= text.length) {
      if (currentIndex >= text.length && onComplete) {
        onComplete();
      }
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayText(text.slice(0, currentIndex + 1));
      setCurrentIndex(currentIndex + 1);
    }, 50);

    return () => clearTimeout(timeout);
  }, [currentIndex, text, isStarted, onComplete]);

  useEffect(() => {
    setDisplayText('');
    setCurrentIndex(0);
    setIsStarted(false);
  }, [text]);

  return (
    <span className="inline-block">
      {displayText}
      {isStarted && currentIndex < text.length && (
        <span className="animate-pulse text-blue-600">|</span>
      )}
    </span>
  );
};

export default TypewriterText; 