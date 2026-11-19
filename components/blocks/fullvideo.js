'use client';
import VideoJS from '../video-player';

export default function FullVideo(props) {
  const block = props.video;
  const link = block?.videolink;
  const muxId = block?.singlevideo?.video?.muxPlaybackId;
  const source = link
    ? { src: link, type: 'video/mp4' }
    : muxId
      ? {
          src: `https://stream.mux.com/${muxId}.m3u8`,
          type: 'application/x-mpegURL',
        }
      : null;
  if (!source) {
    console.warn('FullVideo: no videolink and no Mux singlevideo', { block });
    return null;
  }
  return (
    <div>
      <VideoJS
        options={{
          sources: [source],
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
