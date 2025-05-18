// services/employeeApi.ts
import { mainApi } from "./index";

export const employeeApi = mainApi.injectEndpoints({
    endpoints: (build) => ({
        getEmployeesByBranch: build.query({
            query: ({ branch_id, search = "", limit = 8, offset = 0 }) => ({
                url: `employee/employees/branch/${branch_id}/?search=${search}&limit=${limit}&offset=${offset}`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            }),

        }),

        addEmployee: build.mutation({
            query: (body) => ({
                url: "employee/employees/",
                method: "POST",
                body,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            }),

        }),

        updateEmployee: build.mutation({
            query: ({ id, ...body }) => ({
                url: `employee/employees/${id}/`,
                method: "PATCH",
                body,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            }),

        }),

        deleteEmployee: build.mutation({
            query: (id) => ({
                url: `employee/employees/${id}`,
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            }),

        }),
    }),
});

export const {
    useGetEmployeesByBranchQuery,
    useAddEmployeeMutation,
    useUpdateEmployeeMutation,
    useDeleteEmployeeMutation,
} = employeeApi;
