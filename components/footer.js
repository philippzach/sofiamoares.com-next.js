'use client';

import Container from './container';
import { useState, useEffect } from 'react';

function Clock() {
  const [time, setTime] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateTime = async () => {
      try {
        // Using World Time API to get accurate UTC-04:00 time
        const response = await fetch(
          'https://worldtimeapi.org/api/timezone/America/Antigua'
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const dateTime = new Date(data.datetime);
        const hours = dateTime.getHours();
        const minutes = dateTime.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12;
        const displayMinutes = minutes.toString().padStart(2, '0');

        setTime(`${displayHours}:${displayMinutes} ${ampm}`);
        setIsVisible(true);
      } catch (error) {
        // Hide clock if API fails
        setIsVisible(false);
      }
    };

    updateTime(); // Set initial time
    const interval = setInterval(updateTime, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return <span className='text-sm text-gray-500'> {time}</span>;
}

export default function Footer() {
  return (
    <footer className='bg-accent-1 border-t border-accent-2'>
      <div className='py-2 flex flex-col md:flex-row items-center'>
        <h3 className='text-xl font-bold tracking-tight leading-tight text-center md:text-left mb-10 md:mb-0 lg:pr-4 md:w-1/2'>
          <span className='font-light'>Studio</span> Eastern Caribbean Time
          <Clock />
        </h3>
        <div className='flex flex-row justify-end items-center md:pl-4 md:w-1/2'>
          <a
            href='https://www.behance.net/sofiamoraes'
            className='mx-3 font-bold hover:underline'
            target='_blank'
            rel='noopener noreferrer'
          >
            Behance
          </a>
          <a
            href='https://dribbble.com/sofimoraesm'
            className='mx-3 font-bold hover:underline'
            target='_blank'
            rel='noopener noreferrer'
          >
            Dribbble
          </a>
          <a
            href='https://linkedin.com/in/sofiamoraesm'
            className='mx-3 font-bold hover:underline'
            target='_blank'
            rel='noopener noreferrer'
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
