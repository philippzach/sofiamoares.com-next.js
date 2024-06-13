import SquareImage from './squareimage';
import Carousel from './squarecarousel';
import FullImage from './fullimage';

export default function ImageImage(props) {
  const { longimage, squareimageone, carousel, flip, end } = props;

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-7 gap-4'>
        {flip ? (
          <>
            <div className='col-span-4 md:col-span-3 order-2 md:order-1 space-y-4'>
              <SquareImage image={squareimageone} />
              <Carousel carousel={carousel} />
            </div>
            <div
              className={`col-span-4 order-1 md:order-2 ${
                end ? 'self-end' : ''
              }`}
            >
              <FullImage image={longimage} />
            </div>
          </>
        ) : (
          <>
            <div className='col-span-4'>
              <FullImage image={longimage} />
            </div>
            <div className={`col-span-3 space-y-4 ${end ? 'self-end' : ''}`}>
              <SquareImage image={squareimageone} />
              <Carousel carousel={carousel} />
            </div>
          </>
        )}
      </div>
    </>
  );
}
