import SquareImage from './squareimage';
import FullImage from './fullimage';
import LongImage from './longimage';

export default function ImageImage(props) {
  const { longimage, squareimageone, squareimagetwo, flip, end } = props;

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-4'>
        {flip ? (
          <>
            <div className='col-span-4 md:col-span-2 md:pr-2'>
              <div className='row-span-1 '>
                <SquareImage image={squareimageone} />
                <SquareImage image={squareimagetwo} />
              </div>
            </div>
            <div className='col-span-4 md:col-span-2 row-span-2 md:pl-2 self-start'>
              <div className='w-full h-full'>
                <LongImage image={longimage} />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className='col-span-4 md:col-span-2 row-span-2 self-start'>
              <LongImage image={longimage} />
            </div>
            <div className='col-span-4 md:col-span-2 space-y-4'>
              <div className='row-span-1 space-y-4'>
                <SquareImage image={squareimageone} />
                <SquareImage image={squareimagetwo} />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
