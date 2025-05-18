import { mainApi } from './index';

export const clientApi = mainApi.injectEndpoints({
    endpoints: (build) => ({
        getClients: build.query({
            query: ({ limit = 8, offset = 0, search = '' }) => ({
                url: `/company/clients/?limit=${limit}&offset=${offset}&search=${search}`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            }),

        }),

        createClient: build.mutation({
            query: (newClient) => ({
                url: `/company/clients/`,
                method: 'POST',
                body: newClient,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            }),

        }),

        updateClient: build.mutation({
            query: ({ id, ...updatedData }) => ({
                url: `/company/clients/${id}/`,
                method: 'PUT',
                body: updatedData,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            }),

        }),

        patchClient: build.mutation({
            query: ({ id, ...partialData }) => ({
                url: `/company/clients/${id}/`,
                method: 'PATCH',
                body: partialData,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            }),

        }),

        deleteClient: build.mutation({
            query: (id) => ({
                url: `/company/clients/${id}/`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            }),

        }),
    }),
});

export const {
    useGetClientsQuery,
    useCreateClientMutation,
    useUpdateClientMutation,
    usePatchClientMutation,
    useDeleteClientMutation,
} = clientApi;
