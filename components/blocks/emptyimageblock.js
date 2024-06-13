import SquareImage from './squareimage';

export default function ImageImage(props) {
  const { image, flip } = props;

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {flip ? (
          <>
            <div className=''>
              <SquareImage image={image} />
            </div>
            <div className=''></div>
          </>
        ) : (
          <>
            <div className=''></div>
            <div className=''>
              <SquareImage image={image} />
            </div>
          </>
        )}
      </div>
    </>
  );
}
