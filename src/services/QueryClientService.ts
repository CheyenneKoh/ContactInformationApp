import {QueryClient, UseQueryOptions} from 'react-query';

export type AppQueryOptions<
  QueryData extends unknown,
  QueryError extends unknown,
> = UseQueryOptions<QueryData, QueryError, QueryData, string[]>;

export const queryClient = new QueryClient();

export const QUERY_KEYS = {
  contacts: 'contacts',
};
