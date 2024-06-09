export default function offCenter(Component) {
  return function Flip(props) {
    return (
      <div className='grid grid-cols-1 md:grid-cols-9 '>
        <div className='md:col-start-4 md:col-span-6 '>
          <Component {...props} />
        </div>
        <div className='md:col-start-1 md:col-span-3 '></div>
      </div>
    );
  };
}
