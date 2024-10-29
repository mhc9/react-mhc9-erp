import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const budgetActivityApi = createApi({
    reducerPath: 'budgetActivityApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = localStorage.getItem("access_token");

            if (token) {
                headers.set('Authorization', `Bearer ${token}`);

                return headers;
            }
        },
    }),
    endpoints: (builder) => ({
        getInitialFormData: builder.query({
            query: (args) => {
                const { year } = args;

                return {
                    url: '/api/budget-activities/init/form',
                    params: { year },
                };
            },
        }),
    }),
});

export const { useGetInitialFormDataQuery } = budgetActivityApi;
