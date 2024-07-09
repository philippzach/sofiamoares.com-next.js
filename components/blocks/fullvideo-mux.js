'use client';
import MuxPlayer from '@mux/mux-player-react';
import Image from 'next/image';

export default function FullVideo({ video }) {
  return (
    <MuxPlayer
      autoPlay='muted'
      loop='true'
      preload='auto'
      className='w-full h-full object-contain object-center'
      playbackId={video.muxPlaybackId}
      placeholder={<Image src={video.blurUpThumb} alt='video thumbnail' />}
    />
  );
}
