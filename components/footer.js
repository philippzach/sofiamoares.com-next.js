'use client';

import Container from './container';
import { useState, useEffect } from 'react';

function Clock({ variant = 'default' }) {
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

  return (
    <span
      className={`text-sm ${variant === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}
    >
      {' '}
      {time}
    </span>
  );
}

export default function Footer({ variant = 'default' }) {
  const dark = variant === 'dark';
  const footerCls = dark
    ? 'bg-transparent border-t border-white/20 text-white'
    : 'bg-accent-1 border-t border-accent-2';
  return (
    <footer className={footerCls}>
      <div
        className={`pt-8 pb-10 md:pt-8 md:pb-10 flex flex-col md:flex-row items-center ${dark ? 'px-6 md:px-16 lg:px-6' : ''}`}
      >
        <h3 className='text-xl font-bold tracking-tight leading-tight text-center md:text-left mb-10 md:mb-0 lg:pr-4 md:w-1/2'>
          <span className='font-light'>Studio</span> Eastern Caribbean Time
          <Clock variant={variant} />
        </h3>
        <div className='flex flex-row justify-end items-center md:pl-4 md:w-1/2'>
          <a
            href='https://www.instagram.com/smoraes.studio/'
            className='mx-3 font-bold hover:underline group social'
            target='_blank'
            rel='noopener noreferrer'
          >
            <svg
              version='1.1'
              id='Layer_1'
              xmlns='http://www.w3.org/2000/svg'
              xmlnsXlink='http://www.w3.org/1999/xlink'
              x='0px'
              y='0px'
              viewBox='0 0 56.7 56.7'
              width='30px'
              height='30px'
              enableBackground='new 0 0 56.7 56.7'
              xmlSpace='preserve'
            >
              <g fill='rgb(66, 66, 66)'>
                <path d='M28.2,16.7c-7,0-12.8,5.7-12.8,12.8s5.7,12.8,12.8,12.8S41,36.5,41,29.5S35.2,16.7,28.2,16.7z M28.2,37.7   c-4.5,0-8.2-3.7-8.2-8.2s3.7-8.2,8.2-8.2s8.2,3.7,8.2,8.2S32.7,37.7,28.2,37.7z' />
                <circle cx='41.5' cy='16.4' r='2.9' />
                <path d='M49,8.9c-2.6-2.7-6.3-4.1-10.5-4.1H17.9c-8.7,0-14.5,5.8-14.5,14.5v20.5c0,4.3,1.4,8,4.2,10.7c2.7,2.6,6.3,3.9,10.4,3.9   h20.4c4.3,0,7.9-1.4,10.5-3.9c2.7-2.6,4.1-6.3,4.1-10.6V19.3C53,15.1,51.6,11.5,49,8.9z M48.6,39.9c0,3.1-1.1,5.6-2.9,7.3   s-4.3,2.6-7.3,2.6H18c-3,0-5.5-0.9-7.3-2.6C8.9,45.4,8,42.9,8,39.8V19.3c0-3,0.9-5.5,2.7-7.3c1.7-1.7,4.3-2.6,7.3-2.6h20.6   c3,0,5.5,0.9,7.3,2.7c1.7,1.8,2.7,4.3,2.7,7.2V39.9L48.6,39.9z' />
              </g>
            </svg>
          </a>
          <a
            href='https://www.pinterest.com/sofiamoraesmm/'
            className='mx-3 font-bold hover:underline group social'
            target='_blank'
            rel='noopener noreferrer'
          >
            <svg
              enableBackground='new 0 0 32 32'
              height='32px'
              id='Layer_1'
              version='1.0'
              viewBox='0 0 32 32'
              width='30px'
              xmlSpace='preserve'
              xmlns='http://www.w3.org/2000/svg'
              xmlnsXlink='http://www.w3.org/1999/xlink'
            >
              <path
                d='M15.996,0.007C7.162,0.007,0,7.168,0,16.004c0,6.551,3.938,12.177,9.575,14.65  c-0.045-1.118-0.008-2.459,0.278-3.672c0.308-1.301,2.058-8.719,2.058-8.719s-0.512-1.021-0.512-2.529  c0-2.369,1.376-4.14,3.087-4.14c1.454,0,2.157,1.091,2.157,2.4c0,1.462-0.934,3.65-1.412,5.676c-0.401,1.696,0.852,3.08,2.522,3.08  c3.031,0,5.072-3.891,5.072-8.504c0-3.505-2.361-6.128-6.655-6.128c-4.852,0-7.874,3.617-7.874,7.659  c0,1.394,0.411,2.377,1.054,3.138c0.297,0.35,0.338,0.489,0.229,0.891c-0.074,0.296-0.25,1.003-0.324,1.283  c-0.107,0.407-0.434,0.551-0.801,0.4c-2.235-0.91-3.275-3.358-3.275-6.11c0-4.543,3.831-9.993,11.433-9.993  c6.106,0,10.128,4.42,10.128,9.164c0,6.275-3.491,10.963-8.633,10.963c-1.728,0-3.353-0.934-3.907-1.992c0,0-0.93,3.686-1.125,4.396  c-0.34,1.231-1.004,2.466-1.61,3.427C12.901,31.769,14.421,32,15.996,32c8.834,0,15.995-7.16,15.995-15.996  S24.83,0.007,15.996,0.007z'
                fill='rgb(66, 66, 66)'
              />
              <g />
              <g />
              <g />
              <g />
              <g />
              <g />
            </svg>
          </a>
          <a
            href='https://vimeo.com/sofimoraesm'
            className='mx-3 font-bold hover:underline group social'
            target='_blank'
            rel='noopener noreferrer'
          >
            <svg
              enableBackground='new 0 0 32 32'
              height='32px'
              id='Layer_1'
              version='1.0'
              viewBox='0 0 32 32'
              width='30px'
              xmlSpace='preserve'
              xmlns='http://www.w3.org/2000/svg'
              xmlnsXlink='http://www.w3.org/1999/xlink'
            >
              <path
                clipRule='evenodd'
                d='M31.862,7.204c0.239-1.359,0.233-2.759-0.593-3.815  c-1.155-1.482-3.612-1.537-5.296-1.275c-1.371,0.212-6.002,2.287-7.578,7.252c2.792-0.216,4.257,0.204,3.988,3.324  c-0.114,1.307-0.764,2.737-1.488,4.108c-0.838,1.58-2.409,4.685-4.469,2.447c-1.855-2.014-1.716-5.865-2.141-8.43  c-0.236-1.439-0.485-3.232-0.95-4.712c-0.4-1.273-1.318-2.808-2.44-3.14c-1.206-0.36-2.697,0.202-3.573,0.725  C4.535,5.352,2.412,7.717,0,9.668v0.183c0.479,0.463,0.605,1.224,1.311,1.327c1.659,0.248,3.241-1.569,4.346,0.321  c0.67,1.156,0.879,2.424,1.31,3.669c0.574,1.659,1.019,3.467,1.489,5.375c0.793,3.231,1.771,8.062,4.523,9.244  c1.405,0.604,3.516-0.205,4.584-0.848c2.896-1.739,5.151-4.26,7.082-6.824C29.06,16.046,31.496,9.17,31.862,7.204z'
                fill='rgb(66, 66, 66)'
                fillRule='evenodd'
              />
              <g />
              <g />
              <g />
              <g />
              <g />
              <g />
            </svg>
          </a>
          <a
            href='https://www.behance.net/sofiamoraes'
            className='mx-3 font-bold hover:underline group social'
            target='_blank'
            rel='noopener noreferrer'
          >
            <svg
              enableBackground='new 0 0 32 32'
              height='32px'
              id='Layer_1'
              version='1.0'
              viewBox='0 0 32 32'
              width='30px'
              xmlSpace='preserve'
              xmlns='http://www.w3.org/2000/svg'
              xmlnsXlink='http://www.w3.org/1999/xlink'
            >
              <g>
                <path
                  d='M12.914,15.272c0,0,3.027-0.23,3.027-3.852c0-3.619-2.053-5.403-5.191-5.403L0,6v20h11c0,0,5.5,0.174,5.5-6   C16.5,20,16.904,15.272,12.914,15.272z M4,9h5.5c0,0,1.882,0.031,1.882,2.471C11.382,14,9.5,14,9.5,14H4V9z M10,23H4v-6h6   c0,0,3,0.031,3,3S10.432,23,10,23z'
                  fill='rgb(66, 66, 66)'
                />
                <path
                  d='M25,11c-7.513,0-7.5,7.5-7.5,7.5S17,26,25,26c0,0,7,0,7-6h-4c0,0,0,3-3,3c0,0-3,0-3-4c0,0,8,0,10,0   C32,17,32,11,25,11z M22,17c0,0-0.066-3,3-3c3.065,0,3,3,3,3H22z'
                  fill='rgb(66, 66, 66)'
                />
                <rect
                  fill='rgb(66, 66, 66)'
                  height='2'
                  width='8'
                  x='21'
                  y='8'
                />
              </g>
              <g />
              <g />
              <g />
              <g />
              <g />
              <g />
            </svg>
          </a>
          <a
            href='https://linkedin.com/in/sofiamoraesm'
            className='mx-3 font-bold hover:underline group social'
            target='_blank'
            rel='noopener noreferrer'
          >
            <svg
              enableBackground='new 0 0 32 32'
              height='32px'
              id='Layer_1'
              version='1.0'
              viewBox='0 0 32 32'
              width='30px'
              xmlSpace='preserve'
              xmlns='http://www.w3.org/2000/svg'
              xmlnsXlink='http://www.w3.org/1999/xlink'
            >
              <g>
                <rect fill='rgb(66, 66, 66)' height='23' width='7' y='9' />
                <path
                  d='M24.003,9C20,9,18.89,10.312,18,12V9h-7v23h7V19c0-2,0-4,3.5-4s3.5,2,3.5,4v13h7V19C32,13,31,9,24.003,9z'
                  fill='rgb(66, 66, 66)'
                />
                <circle cx='3.5' cy='3.5' fill='rgb(66, 66, 66)' r='3.5' />
              </g>
              <g />
              <g />
              <g />
              <g />
              <g />
              <g />
            </svg>
          </a>
        </div>
      </div>
      <style jsx>{`
        .social svg * {
          transition: fill 0.2s ease-in-out, stroke 0.2s ease-in-out;
          ${dark ? 'fill: #ffffff;' : ''}
        }
        .social:hover svg * {
          fill: ${dark ? 'rgba(255, 255, 255, 0.5)' : 'rgb(214, 211, 209)'};
          stroke: ${dark ? 'rgba(255, 255, 255, 0.5)' : 'rgb(214, 211, 209)'};
        }
      `}</style>
    </footer>
  );
}
