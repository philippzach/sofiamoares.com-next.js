import SquareImage from './squareimage';

export default function ImageImage(props) {
  const { imageone, imagetwo } = props;

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2'>
        <div>
          <SquareImage image={imageone} />
        </div>
        <div>
          <SquareImage image={imagetwo} />
        </div>
      </div>
    </>
  );
}
