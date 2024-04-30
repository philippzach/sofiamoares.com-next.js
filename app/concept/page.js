import TransitionLink from '@/components/animation/transitionlink';

export default function Page() {
  return (
    <main className='pt-16 h-screen flex flex-col gap-5 items-center justify-center leading-[0.95]'>
      <h1 className='text-6xl'>Adopting new technologies as they merge</h1>
      <TransitionLink
        href='/concept/technology'
        label='Go Forward'
        className='text-2xl'
      />
    </main>
  );
}
