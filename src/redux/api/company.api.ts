import  {mainApi} from "./index";

export const extendedApi = mainApi.injectEndpoints({
    endpoints: (build) => ({
        getCompany: build.query({
            query: () => ({
                url: 'company/get/',
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            }),
        }),
    }),
    overrideExisting: false,
})
export const { useGetCompanyQuery } = extendedApi