'use client';
//import MuxPlayer from '@mux/mux-player-react';
//import Image from 'next/image';
{
  /* <MuxPlayer
      autoPlay='muted'
      loop='true'
      preload='auto'
      className='w-full h-full object-contain object-center'
      playbackId={data.video.muxPlaybackId}
      placeholder={<Image src={data.video.blurUpThumb} alt='video thumbnail' />}
    /> */
}
import VideoJS from './video-player.js';

export default function PostHeaderVideo({ data }) {
  console.log(data);
  return (
    <VideoJS
      options={{
        sources: [{ src: data, type: 'video/mp4' }],
        fluid: true,
        autoplay: 'muted',
        controls: false,
        loop: true,
        preload: 'auto',
      }}
      className='animate-fadeIn'
    />
  );
}
