import SquareVideo from './squarevideo';

export default function ImageImage(props) {
  const { videoone, videotwo } = props;

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className=''>
          <SquareVideo video={videoone} />
        </div>
        <div className=''>
          <SquareVideo video={videotwo} />
        </div>
      </div>
    </>
  );
}
