import { toNextMetadata } from 'react-datocms';
import { performRequest } from '@/lib/datocms';
import { metaTagsFragment } from '@/lib/fragments';
import Image from 'next/image';
import { Cormorant_Garamond } from 'next/font/google';
import LogoCarousel from '@/components/logo-carousel';
import ContactForm from '@/components/contact-form';

const cormorant = Cormorant_Garamond({
  weight: '300',
  subsets: ['latin'],
});

const PAGE_CONTENT_QUERY = `
  {
    site: _site {
      favicon: faviconMetaTags {
        ...metaTagsFragment
      }
    }
    blog {
      seo: _seoMetaTags {
        ...metaTagsFragment
      }
    }
    studio {
      description {
        value
      }
      contact
      info
    }
  }

  ${metaTagsFragment}
  
`;

function getPageRequest() {
  return { query: PAGE_CONTENT_QUERY };
}

export async function generateMetadata() {
  const { site, blog } = await performRequest(getPageRequest());

  return {
    ...toNextMetadata([...site.favicon, ...blog.seo]),
    title: 'Brand Strategy and Creative Direction, Three Ways to Build',
    description: 'Seed Kit, Living Brand, Full World. Three tiers of creative direction. Brand architecture from identity system to complete visual world. Start where you are.',
  };
}

export default async function Page() {
  const pageRequest = getPageRequest();
  const data = await performRequest(pageRequest);

  const { contact } = data.studio;
  const description =
    data.studio.description.value.document.children[0].children[0].value;
  const { services, industries, clients } = data.studio.info;

  // Added static testimonials to build trust and boost conversions
  const testimonials = [
    {
      quote:
        'Sofia exceeded our expectations and delivered an exceptional brand identity that truly resonated with our values.',
      name: 'Simon — Cofounder, Wyldr',
    },
    {
      quote:
        'From UX to final visuals, Sofia owns the process and ships fast. We saw results within days.',
      name: 'Virgjina — Product Manager, Swiss Ventures Group',
    },
    {
      quote:
        'Working with Sofia was effortless – her combination of strategic thinking and beautiful design just works.',
      name: 'Martha — Design Lead, Calouste Gulbenkian Foundation',
    },
  ];

  return (
    <main className='max-w-7xl mx-auto px-4 md:px-8'>
      {/* ---------- BIO ---------- */}
      <section className='py-28'>
        <h1 className={`${cormorant.className} text-[24px] md:text-[24px] lg:text-[30px] font-light tracking-tight leading-snug max-w-5xl`}>
          There is a portal between what is felt and what is seen. I work in that space.
        </h1>
        <p className={`${cormorant.className} mt-8 text-[24px] md:text-[24px] lg:text-[30px] font-light tracking-tight leading-snug max-w-5xl`}>
          From your seed, a photograph, a feeling, a conviction, I build visual worlds that feel inevitable. Not designed. Revealed. The brand was always there. I make it visible.
        </p>
        <a
          href='#contact'
          className='mt-8 inline-block bg-black text-white rounded-md py-4 px-8 text-lg hover:bg-gray-800 transition'
        >
          Start your project ↵
        </a>
      </section>

      {/* ---------- OFFERINGS ---------- */}
      {/*<section className='mb-24'>
        <div className='grid md:grid-cols-3 gap-10 text-center'>
          <div className='p-8 border rounded-lg hover:shadow-lg transition'>
            <h2 className='text-3xl font-bold mt-2 mb-4'>
              <span className='text-gray-400 text-sm'>(01) </span>Sprints
            </h2>
            <p className='text-gray-600 font-light '>
              Fast, focused engagements to explore, test, or move a critical
              piece forward—without getting bogged down.
            </p>
          </div>
          <div className='p-8 border rounded-lg hover:shadow-lg transition'>
            <h2 className='text-3xl font-bold mt-2 mb-4'>
              <span className='text-gray-400 text-sm'>(02) </span>Projects
            </h2>
            <p className='text-gray-600 font-light '>
              End-to-end design support for a product, brand, or web
              experience—with a defined scope and measurable outcomes.
            </p>
          </div>
          <div className='p-8 border rounded-lg hover:shadow-lg transition'>
            <h2 className='text-3xl font-bold mt-2 mb-4'>
              <span className='text-gray-400 text-sm'>(03) </span>Partnerships
            </h2>
            <p className='text-gray-600 font-light '>
              For companies that need more than a vendor—they want a long-term
              design partner committed to growth.
            </p>
          </div>
        </div>
      </section>*/}

      {/* Services Grid */}
      <section>
        <div className='w-full flex flex-col gap-8'>
          {/* Tier 1 — The Seed */}
          <div className='block w-full'>
            <div className='flex flex-col md:flex-row w-full'>
              <div className='group/image relative w-full md:w-1/2 mb-4 md:mb-0 aspect-[1.5/1]'>
                <Image
                  src='/photos/webdesign/servicecover.png'
                  alt='The Seed 1'
                  fill
                  className='object-cover rounded-lg transition-opacity duration-700 ease-in-out opacity-100 group-hover/image:opacity-0'
                  sizes='(max-width: 768px) 100vw, 50vw'
                />
                <Image
                  src='/photos/webdesign/servicecover2.png'
                  alt='The Seed 2'
                  fill
                  className='object-cover rounded-lg transition-opacity duration-700 ease-in-out opacity-0 group-hover/image:opacity-100'
                  sizes='(max-width: 768px) 100vw, 50vw'
                />
              </div>
              <div className='flex flex-col justify-center text-left w-full md:w-1/2 p-6'>
                <h2 className='text-4xl font-bold text-prim-grey mb-2'>
                  The Seed
                </h2>
                <p className='text-sm text-gray-400 mb-3'>$1,500 · 1 week</p>
                <p className='text-gray-500'>
                  Your identity, revealed. One session, one week, a complete
                  visual language built from your brand&apos;s seed.
                </p>
                <a
                  href='https://www.pinterest.com/sofiamoraesmm/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='self-start mt-6 text-base md:text-2xl lg:text-3xl font-light underline decoration-1 underline-offset-4 md:underline-offset-[6px] transition-opacity duration-300 ease-out hover:opacity-60 cursor-pointer'
                >
                  More inspiration ↵
                </a>
              </div>
            </div>
          </div>
          {/* Tier 2 — The Living Brand */}
          <div className='block w-full'>
            <div className='flex flex-col md:flex-row w-full'>
              <div className='group/image relative w-full md:w-1/2 mb-4 md:mb-0 aspect-[1.5/1]'>
                <Image
                  src='/photos/aiservices/ai1.webp'
                  alt='The Living Brand 1'
                  fill
                  className='object-cover rounded-lg transition-opacity duration-700 ease-in-out opacity-100 group-hover/image:opacity-0'
                  sizes='(max-width: 768px) 100vw, 50vw'
                />
                <Image
                  src='/photos/aiservices/aiservice2.webp'
                  alt='The Living Brand 2'
                  fill
                  className='object-cover rounded-lg transition-opacity duration-700 ease-in-out opacity-0 group-hover/image:opacity-100'
                  sizes='(max-width: 768px) 100vw, 50vw'
                />
              </div>
              <div className='flex flex-col justify-center text-left w-full md:w-1/2 p-6'>
                <h2 className='text-4xl font-bold text-prim-grey mb-2'>
                  The Living Brand
                </h2>
                <p className='text-sm text-gray-400 mb-3'>$2,500–4,500 · 3–4 weeks</p>
                <p className='text-gray-500'>
                  Identity and the place people land. Strategy, a full visual
                  system, and a website built and ready to launch.
                </p>
                <a
                  href='https://www.pinterest.com/sofiamoraesmm/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='self-start mt-6 text-base md:text-2xl lg:text-3xl font-light underline decoration-1 underline-offset-4 md:underline-offset-[6px] transition-opacity duration-300 ease-out hover:opacity-60 cursor-pointer'
                >
                  More inspiration ↵
                </a>
              </div>
            </div>
          </div>
          {/* Tier 3 — The Full World */}
          <div className='block w-full'>
            <div className='flex flex-col md:flex-row w-full'>
              <div className='group/image relative w-full md:w-1/2 mb-4 md:mb-0 aspect-[1.5/1]'>
                <Image
                  src='/photos/creativedirection/c_lb1.jpg'
                  alt='The Full World 1'
                  fill
                  className='object-cover rounded-lg transition-opacity duration-700 ease-in-out opacity-100 group-hover/image:opacity-0'
                  sizes='(max-width: 768px) 100vw, 50vw'
                />
                <Image
                  src='/photos/creativedirection/c_lb2.jpg'
                  alt='The Full World 2'
                  fill
                  className='object-cover rounded-lg transition-opacity duration-700 ease-in-out opacity-0 group-hover/image:opacity-100'
                  sizes='(max-width: 768px) 100vw, 50vw'
                />
              </div>
              <div className='flex flex-col justify-center text-left w-full md:w-1/2 p-6'>
                <h2 className='text-4xl font-bold text-prim-grey mb-2'>
                  The Full World
                </h2>
                <p className='text-sm text-gray-400 mb-3'>From $4,500 · continues at $1,200 / month</p>
                <p className='text-gray-500'>
                  Everything above, plus the direction that keeps it alive: one
                  session a month and a continuous flow of campaign visuals,
                  content and direction.
                </p>
                <a
                  href='https://www.pinterest.com/sofiamoraesmm/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='self-start mt-6 text-base md:text-2xl lg:text-3xl font-light underline decoration-1 underline-offset-4 md:underline-offset-[6px] transition-opacity duration-300 ease-out hover:opacity-60 cursor-pointer'
                >
                  More inspiration ↵
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ---------- TESTIMONIALS ---------- */}
      <section className='bg-gray-50 rounded-md py-24 mb-24 mt-24'>
        <h3 className='text-xl md:text-4xl font-semibold text-center mb-12'>
          What partners say
        </h3>
        <div className='max-w-2xl mx-auto space-y-16'>
          {testimonials.map((t, idx) => (
            <blockquote key={idx} className='text-center'>
              <p className='text-lg md:text-xl font-medium mb-4 '>
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className='text-gray-600 font-light'>{t.name}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* ---------- CLIENT LOGOS / SOCIAL PROOF ---------- */}
      <section className='mb-28 text-center'>
        <h3 className='text-xl md:text-3xl font-semibold mb-10'>
          Trusted by teams at
        </h3>
        <LogoCarousel clients={clients} />
      </section>

      {/* ---------- SERVICES & INDUSTRIES ---------- */}
      <section className='md:flex md:items-start md:gap-20 mb-24'>
        <div className='flex-1 mb-16 md:mb-0'>
          <h4 className='font-secondary  text-xl md:text-xl mb-4 text-gray-600'>
            Services
          </h4>
          <ul className='space-y-2 text-lg'>
            {services.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </div>
        <div className='flex-1'>
          <h4 className='font-secondary text-xl md:text-xl mb-4 text-gray-600'>
            Industries
          </h4>
          <ul className='space-y-2 text-lg'>
            {industries.map((ind) => (
              <li key={ind}>{ind}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- CONTACT FORM ---------- */}
      <section id='contact' className='py-24 border-t'>
        <h2 className='text-3xl md:text-5xl font-bold text-center mb-10'>
          Tell me about your project
        </h2>
        <ContactForm />
      </section>
    </main>
  );
}
