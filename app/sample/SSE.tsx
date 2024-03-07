'use client';
import { useState, useEffect } from 'react';

export const Component = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const eventSource = new EventSource('sample');

    const handleEventSourceMessage = (event: MessageEvent) => {
      setMessage(p => `${p}${event.data}`);
    };

    const handleEventSourceError = (error: Event) => {
      console.error('EventSource failed:', error);
      eventSource.close();
    };

    eventSource.addEventListener('message', handleEventSourceMessage);
    eventSource.addEventListener('error', handleEventSourceError);

    return () => {
      eventSource.removeEventListener('message', handleEventSourceMessage);
      eventSource.removeEventListener('error', handleEventSourceError);
      eventSource.close();
    };
  }, []);

  return <div className="w-full p-8">{message}</div>;
};
