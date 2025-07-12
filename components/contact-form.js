'use client';

import { useForm, ValidationError } from '@formspree/react';

export default function ContactForm() {
  const [state, handleSubmit] = useForm('mwpqeelb'); // Formspree form ID

  if (state.submitting) {
    return (
      <div className='flex flex-col items-center gap-6 py-16'>
        {/* Spinner */}
        <svg
          className='animate-spin h-12 w-12 text-black'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
        >
          <circle
            className='opacity-25'
            cx='12'
            cy='12'
            r='10'
            stroke='currentColor'
            strokeWidth='4'
          ></circle>
          <path
            className='opacity-75'
            fill='currentColor'
            d='M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z'
          ></path>
        </svg>
        <p className='text-xl font-medium'>Sending your message...</p>
      </div>
    );
  }

  if (state.succeeded) {
    return (
      <div className='flex flex-col items-center gap-4 py-16 text-center'>
        {/* Check icon */}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
          className='w-12 h-12 text-green-600'
        >
          <path
            fillRule='evenodd'
            d='M2.25 12a9.75 9.75 0 1119.5 0 9.75 9.75 0 01-19.5 0zm14.03-2.28a.75.75 0 00-1.06-1.06l-4.72 4.72-2.22-2.22a.75.75 0 10-1.06 1.06l2.75 2.75a.75.75 0 001.06 0l5.25-5.25z'
            clipRule='evenodd'
          />
        </svg>
        <h3 className='text-2xl font-semibold'>Thank you!</h3>
        <p className='text-lg max-w-md'>
          I&apos;ve received your message and will get back to you as soon as
          possible.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className='max-w-2xl mx-auto space-y-8'>
      <div>
        <label className='block text-sm font-medium mb-2' htmlFor='name'>
          Name
        </label>
        <input
          id='name'
          type='text'
          name='name'
          required
          className='w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/20'
        />
        <ValidationError prefix='Name' field='name' errors={state.errors} />
      </div>

      <div>
        <label className='block text-sm font-medium mb-2' htmlFor='email'>
          Email or WhatsApp
        </label>
        <input
          id='email'
          type='email'
          name='email'
          required
          className='w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/20'
        />
        <ValidationError prefix='Email' field='email' errors={state.errors} />
      </div>

      <div>
        <label className='block text-sm font-medium mb-2' htmlFor='message'>
          Message
        </label>
        <textarea
          id='message'
          name='message'
          rows={5}
          required
          className='w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/20'
        />
        <ValidationError
          prefix='Message'
          field='message'
          errors={state.errors}
        />
      </div>

      <button
        type='submit'
        disabled={state.submitting}
        className='w-full bg-black text-white py-4 rounded-md text-lg hover:bg-gray-800 transition disabled:opacity-60'
      >
        {state.submitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
