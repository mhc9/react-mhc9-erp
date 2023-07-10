import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const requisitionApi = createApi({
    reducerPath: 'requisitionApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
    endpoints: (builder) => ({
        getInitialFormData: builder.query({
            query: () => ({
                url: '/api/init/form'
            }),
        }),
    }),
});

export const { useGetInitialFormDataQuery } = requisitionApi;
