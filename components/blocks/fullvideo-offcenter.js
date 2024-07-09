'use client';
import VideoJS from '../video-player';
//import Image from 'next/image';

export default function FullVideo(props) {
  return (
    <div>
      <VideoJS
        options={{
          sources: [{ src: props.videolink, type: 'video/mp4' }],
          fluid: true,
          autoplay: 'muted',
          controls: false,
          loop: true,
          preload: 'auto',
        }}
        className='animate-fadeIn'
      />
    </div>
  );
}
