'use client';
import VideoJS from '../video-player';

export default function SquareVideo(props) {
  // Called two ways:
  // 1. spread of a block with {videolink, video:{video:{muxPlaybackId}}}
  //    (ImagevideoblockRecord, CarouselvideoRecord)
  // 2. video={linkedRecord} where linkedRecord.video.muxPlaybackId exists
  //    (Differentsize3videoRecord, Differentsize3videocarouselRecord,
  //     DifferentsizeimagevideoRecord)
  const link = props.videolink;
  const muxId =
    props.singlevideo?.video?.muxPlaybackId ||
    props.video?.video?.muxPlaybackId ||
    props.video?.muxPlaybackId;
  const source = link
    ? { src: link, type: 'video/mp4' }
    : muxId
      ? {
          src: `https://stream.mux.com/${muxId}.m3u8`,
          type: 'application/x-mpegURL',
        }
      : null;
  if (!source) {
    console.warn('SquareVideo: no videolink and no Mux video', { props });
    return null;
  }
  return (
    <>
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
    </>
  );
}
