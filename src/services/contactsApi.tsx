import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Contact } from "../pages/roles-permissions/model/contact.model";

const Code = "tsxehwW980Q6yoO-A23XDjwd49wN8S7bVzYC7k-FDb3MAzFuJaZowQ==";
const getApiUrlpath = "https://easyinvoicingapi.azurewebsites.net/api";
const completeUrl = getApiUrlpath + `?Code=${Code}`;

export const contactApi = createApi({
  reducerPath: 'ContactApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://easyinvoicingapi.azurewebsites.net/api/' }),
  endpoints: (builder) => ({
    contacts: builder.query<Contact[], void>({
      query: () => `/Items/GetItems?Code=${Code}&pageNo=1&pageSize=15&sortArrow=sort&sortColumn=ModifiedDate&searchValue=&sortOrder=desc&heading=&hasMore=true&loadMoreData=true&itemId=-1&BusinessId=89`,
    }),
    post: builder.mutation<Contact, Partial<Contact>>({
      query: ({
          businessId,
                businessLocationId,
        }) =>
        `/Items/AddUpdateItem?Code=${Code}&businessId=${businessId}&businessLocationId=${businessLocationId}`,
      
    }),
  }),
});

export const { useContactsQuery, usePostMutation } = contactApi;
