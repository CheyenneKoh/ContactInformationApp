import {Contact} from 'models/Contact';
import {useQuery} from 'react-query';
import {QUERY_KEYS} from '../services/QueryClientService';

const URL = 'https://mocki.io/v1/75ca9c88-8da0-4513-a588-5c99ebd9a0b3';

function getContacts() {
  return new Promise<Contact[]>(async resolve => {
    const response = await fetch(URL);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    resolve(data);
  });
}

/**
 * Hook that retrieves the list of contacts from a mock api endpoint using React Query
 *
 * @see https://tanstack.com/query/v3/docs/react/guides/queries#query-basics
 */

export function useContacts() {
  return useQuery([QUERY_KEYS.contacts], getContacts, {staleTime: Infinity});
}
