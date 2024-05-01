'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Image as DatocmsImage } from 'react-datocms';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function Animation({ profilePic }) {
  gsap.registerPlugin(useGSAP);
  const container = useRef();
  const router = useRouter();
  const { contextSafe } = useGSAP({ scope: container });

  useGSAP(
    () => {
      gsap.to('.FadeIn', {
        opacity: 1,
        duration: 1,
      });
    },
    { scope: container }
  );

  const fadeOut = contextSafe(() => {
    gsap.to('.FadeOut', {
      opacity: 0,
      duration: 0.35,
      onComplete: () => {
        router.push('/concept/technology');
      },
    });
  });

  return (
    <div ref={container}>
      <main
        id='transition-element'
        className='h-screen flex flex-col gap-5 items-center justify-center leading-[0.95]'
      >
        <h1 className='FadeIn FadeOut opacity-0 text-6xl'>
          Adopting new technologies as they merge
        </h1>
        <div className='FadeIn FadeOut opacity-0 h-52 w-52'>
          <DatocmsImage data={profilePic.responsiveImage} />
        </div>
        <button
          className='FadeIn FadeOut opacity-0 border-[2px] uppercase border-white p-4 rounded-xl hover:bg-white hover:text-slate-900 cursor-pointer'
          onClick={fadeOut}
        >
          SHow me more
        </button>
      </main>
    </div>
  );
}
