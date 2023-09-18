import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

  export const InvoiceApi = createApi({
  baseQuery: fetchBaseQuery({
  baseUrl: "https://easyinvoicingapi.azurewebsites.net/api",
  }),
  endpoints: (builder) => ({
    getNotification: builder.query({
      query: (options) => {
        const {
        Code,
        UserId,
        pageNo,
        pageSize,
        SearchValue,
        SortColumn,
        SortOrder,
        } = options;

        const params = new URLSearchParams({
          Code,
          UserId:UserId.toString(),
          pageNo:pageNo.toString(),
          pageSize:pageSize.toString(),
          SearchValue,
          SortColumn,
          SortOrder,
        });

        return `Dashboard/GetNotifications?Code=tsxehwW980Q6yoO-A23XDjwd49wN8S7bVzYC7k-FDb3MAzFuJaZowQ%3D%3D&${UserId}&${pageNo}&${pageSize}&SearchValue=&SortColumn=&SortOrder=${params.toString()}`;
      },
    }),

     // PUT Mutation
     
      updateChangePassword: builder.mutation({
        query: ({ id, data }) => ({
          url: `Auth/ChangePassword?Code=tsxehwW980Q6yoO-A23XDjwd49wN8S7bVzYC7k-FDb3MAzFuJaZowQ%3D%3D`,
          method: "PUT",
          body: data
        }),
      }),
    }),
 

     
  
});

export const { useGetNotificationQuery ,useUpdateChangePasswordMutation } = InvoiceApi;