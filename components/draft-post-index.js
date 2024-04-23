'use client';

import { useQuerySubscription } from 'react-datocms/use-query-subscription';
import { WorkIndex } from './work-index';

export function DraftPostIndex({ subscription }) {
  const { data } = useQuerySubscription(subscription);

  return <WorkIndex data={data} />;
}
