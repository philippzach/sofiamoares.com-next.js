import TransitionLink from '@/components/animation/transitionlink';

export default function Tech() {
  return (
    <main className='pt-16 h-screen flex flex-col gap-5 items-center justify-center leading-[0.95]'>
      <h1 className='text-6xl'>Midjourney Image Generation</h1>
      <TransitionLink href='/concept' label='Go Back' className='text-2xl' />
    </main>
  );
}
