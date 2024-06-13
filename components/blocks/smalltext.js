export default function SmallText({ textBlock }) {
  const { smalltext, text } = textBlock;
  return (
    <section className='w-full mt-12 mb-12 md:mt-44 md:mb-48'>
      <article className='w-full relative mx-auto grid grid-cols-12 gap-0 '>
        <h3 className='text-lg font-secondary col-start-3 col-end-12 md:col-start-3 md:col-end-12 mb-4'>
          — {smalltext}
        </h3>
        <h2 className='text-2xl md:text-3xl leading-[1] col-start-2 col-end-12 md:col-start-2 md:col-end-11 lg:col-end-10 xl:col-end-8 whitespace-pre-wrap'>
          {text}
        </h2>
      </article>
    </section>
  );
}
