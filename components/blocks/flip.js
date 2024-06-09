export default function withFlip(ComponentLeft, ComponentRight, flip) {
  return function Flip(props) {
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {flip ? (
          <>
            <div className='order-2 md:order-1 '>
              <ComponentRight {...props} />
            </div>
            <div className='order-1 md:order-2'>
              <ComponentLeft {...props} />
            </div>
          </>
        ) : (
          <>
            <div>
              <ComponentLeft {...props} />
            </div>
            <div className=''>
              <ComponentRight {...props} />
            </div>
          </>
        )}
      </div>
    );
  };
}
