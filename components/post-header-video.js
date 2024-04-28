'use client';
import MuxPlayer from '@mux/mux-player-react';
import Image from 'next/image';

export default function PostHeaderVideo({ data }) {
  return (
    <MuxPlayer
      autoPlay='muted'
      loop='true'
      preload='auto'
      className='w-full h-full object-contain object-center'
      playbackId={data.video.muxPlaybackId}
      placeholder={<Image src={data.video.blurUpThumb} alt='video thumbnail' />}
    />
  );
}
