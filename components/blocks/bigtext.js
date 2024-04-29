export default function BigText({ textBlock }) {
  const { smalltext, text } = textBlock;
  return (
    <section className='mb-12 mt-12 m-auto lg:w-[75%]'>
      <article className='grid grid-cols-24 gap-0 '>
        <h3 className='text-2xl font-secondary grid-end-10 grid-start-5 sm:grid-end-22 sm:grid-start-2 mb-4 b1'>
          — {smalltext}
        </h3>
        <h2 className='text-6xl md:text-7xl font-extrabold leading-[1] grid-end-16 grid-start-4 sm:grid-end-22 sm:grid-start-2 f1 whitespace-pre-wraps'>
          {text}
        </h2>
      </article>
    </section>
  );
}
