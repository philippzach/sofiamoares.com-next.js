export default function SquareText(block) {
  const { description } = block;
  return (
    <h3 className='text-xl lg:text-2xl font-secondary ml-10 mr-10 lg:ml-28 lg:mr-28 hidden md:block'>
      {description}
    </h3>
  );
}
