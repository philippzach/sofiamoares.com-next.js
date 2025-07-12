'use server';

import { cookies } from 'next/headers';

/* export async function setCookie() {
  cookies().set('animation', 'true');
} */
export async function setCookie() {
  const cookieStore = await cookies();
  cookieStore.set('animation', 'true');
}

/* export async function validateCookie() {
  const hasCookie = await cookies().has('animation');
  if (hasCookie) {
    const value = await cookies().get('animation');
    return value.value;
  } else return false;
} */
export async function validateCookie() {
  const cookieStore = await cookies();
  const hasCookie = cookieStore.has('animation');
  if (hasCookie) {
    const value = cookieStore.get('animation');
    return value.value;
  } else return false;
}
