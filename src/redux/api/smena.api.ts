import { mainApi } from "./index";

export const shiftsApi = mainApi.injectEndpoints({
    endpoints: (build) => ({
        // GET /company/shifts/{branch_id}/
        getShifts: build.query({
            query: ({ branch }: { branch?: number }) => ({
                url: `/company/shifts/${branch ?? 1}/`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            }),
        }),

        // POST /company/shift-create/
        createShift: build.mutation({
            query: (body) => ({
                url: '/company/shift-create/',
                method: 'POST',
                body,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            }),
        }),

        // PATCH /company/shift-detail/{id}/
        updateShift: build.mutation({
            query: ({ id, ...body }) => ({
                url: `/company/shift-detail/${id}/`,
                method: 'PATCH',
                body,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            }),
        }),

        // DELETE /company/shift-detail/{id}/
        deleteShift: build.mutation({
            query: (id: number) => ({
                url: `/company/shift-detail/${id}/`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetShiftsQuery,
    useCreateShiftMutation,
    useUpdateShiftMutation,
    useDeleteShiftMutation,
} = shiftsApi;
