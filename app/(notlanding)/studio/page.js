import { toNextMetadata } from 'react-datocms';

import { performRequest } from '@/lib/datocms';
import { metaTagsFragment } from '@/lib/fragments';
import Image from 'next/image';

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

  return toNextMetadata([...site.favicon, ...blog.seo]);
}

export default async function Page() {
  const pageRequest = getPageRequest();
  const data = await performRequest(pageRequest);

  const { contact } = data.studio;
  const description =
    data.studio.description.value.document.children[0].children[0].value;
  const { services, industries, clients } = data.studio.info;

  return (
    <main className=''>
      <div className='text-xl sm:text-2xl md:text-4xl lg:text-5xl pt-20 pb-20 animate-fadeIn tracking-tight leading-tight'>
        <div className='md:flex md:items-start md:gap-5 w-full'>
          <div className='w-full md:w-1/2'>
            <section className='mb-24 pr-4 md:mb-56 md:max-w-screen-2xl md:pr-20'>
              {description}
            </section>
          </div>
          <div className='w-full md:w-1/2'>
            <section className='mb-4'>
              <Image
                src='/photos/sofia_moraes_portrait.jpg'
                alt='Sofia Moraes Portrait'
                width={500}
                height={500}
              />
            </section>
          </div>
        </div>
        <section className='mb-20 md:mb-40'>
          <p className='font-secondary text-base md:text-lg'>Contact</p>
          <a
            href='mailto:sofiamoraes.m@gmail.com'
            className='cursor-pointer hover:underline'
          >
            {contact}
          </a>
        </section>

        <div className='md:flex md:items-start md:gap-5 w-full'>
          <div className='w-full md:w-1/2'>
            <section className='mb-4 md:mb-8'>
              <p className='font-secondary text-base md:text-lg'>Services</p>
              <ul>
                {services.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>
            </section>
            <section className='mb-20 md:mb-40'>
              <p className='font-secondary text-base md:text-lg'>Industries</p>
              <ul>
                {industries.map((ind) => (
                  <li key={ind}>{ind}</li>
                ))}
              </ul>
            </section>
          </div>
          <div className='w-full md:w-1/2'>
            <section className=''>
              <p className='font-secondary text-base md:text-lg'>Clients</p>
              <ul>
                {clients.map((client) => (
                  <li key={client.name}>
                    <a
                      target='_blank'
                      rel='noreferrer noopener'
                      className='cursor-pointer hover:underline'
                      href={client.link}
                    >
                      {client.name}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
