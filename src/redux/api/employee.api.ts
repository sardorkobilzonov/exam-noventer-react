import { mainApi } from "./index";

export const extendedApi = mainApi.injectEndpoints({
    endpoints: (build) => ({
        getEmployee: build.query({
            query: () => ({
                url: "employee/get/",
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            }),
        }),
    }),
});
export const { useGetEmployeeQuery } = extendedApi