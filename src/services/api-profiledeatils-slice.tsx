import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const Code = "tsxehwW980Q6yoO-A23XDjwd49wN8S7bVzYC7k-FDb3MAzFuJaZowQ==";
const getApiUrlpath = "https://easyinvoicingapi.azurewebsites.net/api";
const completeUrl = getApiUrlpath + `?Code=${Code}`;
const GETBUSINESS = "/Business/GetBusinessProfile";
const GETGLOBALCODES = "/GlobalCodes/GetGlobalCodes";
const GETUPDATEBUSINESSPROFILE = "/Business/UpdateBusinessProfile";

export const profileApi: any = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: getApiUrlpath,
  }),

  ////////////////////////////////////////////////PROFILE_DETAILS_API///////////////////////////////////////////////////////////////////
  endpoints: (builder) => ({
    Profile: builder.query({
      query: ({ BusinessId, BusinessLocationId }) =>
        `${GETBUSINESS}?Code=${Code}&BusinessId=${BusinessId}&BusinessLocationId=${BusinessLocationId}`,
    }),


  ////////////////////////////////////////////////GLOBAL_CODE_API///////////////////////////////////////////////////////////////////

    Globalcode: builder.query({
      query: ({ categoryName }) =>
        `${GETGLOBALCODES}?Code=${Code}&categoryName =${categoryName}`,
    }),

    
  ////////////////////////////////////////////////UPDATEBUSINESS_DETAILS_API///////////////////////////////////////////////////////////////////

    Updatebusiness: builder.mutation({
      query: (data) => ({
        url: `${GETUPDATEBUSINESSPROFILE}?Code=${Code}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});
export const {
  useProfileQuery,
  useGlobalcodeQuery,
  useUpdatebusinessMutation,
} = profileApi;
