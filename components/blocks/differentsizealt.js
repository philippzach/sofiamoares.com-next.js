export default function differentSized(
  ComponentLeft,
  ComponentRight,
  flip,
  end
) {
  return function Flip(props) {
    return (
      <>
        <div className='grid grid-cols-1 md:grid-cols-7 gap-4'>
          {flip ? (
            <>
              <div
                className={`col-span-4 md:col-span-3 order-2 md:order-1 ${
                  end ? 'self-end' : ''
                }`}
              >
                <ComponentRight {...props} />
              </div>
              <div className='col-span-4 order-1 md:order-2'>
                <ComponentLeft {...props} />
              </div>
            </>
          ) : (
            <>
              <div className='col-span-4'>
                <ComponentLeft {...props} />
              </div>
              <div
                className={`col-span-4 md:col-span-3 ${end ? 'self-end' : ''}`}
              >
                <ComponentRight {...props} />
              </div>
            </>
          )}
        </div>
      </>
    );
  };
}
