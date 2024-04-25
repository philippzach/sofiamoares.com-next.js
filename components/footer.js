import Container from './container';

export default function Footer() {
  return (
    <footer className='bg-accent-1 border-t border-accent-2'>
      <div className='py-2 flex flex-col md:flex-row items-center'>
        <h3 className='text-xl font-bold tracking-tight leading-tight text-center md:text-left mb-10 md:mb-0 lg:pr-4 md:w-1/2'>
          <span className='font-light'>Studio</span> Madeira, Portugal
        </h3>
        <div className='flex flex-row justify-end items-center md:pl-4 md:w-1/2'>
          <a
            href='https://www.behance.net/sofiamoraes'
            className='mx-3 font-bold hover:underline'
            target='_blank'
            rel='noopener noreferrer'
          >
            Behance
          </a>
          <a
            href='https://dribbble.com/sofimoraesm'
            className='mx-3 font-bold hover:underline'
            target='_blank'
            rel='noopener noreferrer'
          >
            Dribbble
          </a>
          <a
            href='https://linkedin.com/in/sofiamoraesm'
            className='mx-3 font-bold hover:underline'
            target='_blank'
            rel='noopener noreferrer'
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
