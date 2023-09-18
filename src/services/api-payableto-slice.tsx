import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getApiUrl } from "./api.config";    //////////////////////API_ENDPOINTS////////////////////////////////////////

const Code = "tsxehwW980Q6yoO-A23XDjwd49wN8S7bVzYC7k-FDb3MAzFuJaZowQ==";
const getApiUrlpath = "https://easyinvoicingapi.azurewebsites.net/api";
const completeUrl = getApiUrlpath + `?Code=${Code}`;
const GETPAYABLETOBUSINESSADDRESS = "/Business/GetPayableToBusinessAddress";

export const payabeltoApi = createApi({
  reducerPath: "payabeltoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: getApiUrlpath,
  }),
  endpoints: (builder) => ({
    payable: builder.query({
      query: ({ BusinessId,}) =>
        `${GETPAYABLETOBUSINESSADDRESS}?Code=${Code}&BusinessId=${BusinessId}`,
    }),
  }),
  
});

export const { usePayableQuery } = payabeltoApi;

