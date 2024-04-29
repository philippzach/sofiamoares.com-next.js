'use client';
import MuxPlayer from '@mux/mux-player-react';
import Image from 'next/image';

export default function FullVideo(props) {
  const { video } = props.video;
  return (
    <>
      <MuxPlayer
        autoPlay='muted'
        loop='true'
        preload='auto'
        className='w-full object-contain object-center aspect-square'
        playbackId={video.muxPlaybackId}
        placeholder={<Image src={video.blurUpThumb} alt='video thumbnail' />}
      />
    </>
  );
}
