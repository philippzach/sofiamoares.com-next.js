'use client';
import { tr } from 'date-fns/locale';
import VideoJS from '../video-player';
import Image from 'next/image';

export default function FullVideo(props) {
  const { videolink } = props;
  return (
    <>
      <VideoJS
        options={{
          sources: [{ src: videolink, type: 'video/mp4' }],
          fluid: true,
          autoplay: 'muted',
          controls: false,
          loop: true,
          preload: 'auto',
        }}
        className='animate-fadeIn'
      />
    </>
  );
}
