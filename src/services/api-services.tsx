
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const Code = "tsxehwW980Q6yoO-A23XDjwd49wN8S7bVzYC7k-FDb3MAzFuJaZowQ==";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://easyinvoicingapi.azurewebsites.net/api",
  }),
  endpoints: (builder) => ({
    getTeamMembers: builder.query({
      query: (options) => {
        const {
          pageNo,
          pageSize,
          sortArrow,
          sortColumn,
          searchValue,
          sortOrder,
          heading,
          hasMore,
          loadMoreData,
          UserId,
          BusinessId,
        } = options;

        const params = new URLSearchParams({
          pageNo: pageNo.toString(),
          pageSize: pageSize.toString(),
          sortArrow,
          sortColumn,
          searchValue,
          sortOrder,
          heading,
          hasMore: hasMore.toString(),
          loadMoreData: loadMoreData.toString(),
          UserId: UserId.toString(),
          BusinessId: BusinessId.toString(),
        });

        return `TeamMembers/GetTeamMembers?Code=${Code}&${params.toString()}`;
      },
    }),

    // PUT Mutation
    updateTeamMember: builder.mutation({
      query: ({ id, data }) => ({
        url: `TeamMember/ToggleTeamMember?Code=${Code}&id=${id}&isActive=${data.isActive}&actionPerformedBy=summer%40yopmail.com`,
        method: "PUT",
        body: {},
      }),
    }),

    // POST Mutation
    createTeamMember: builder.mutation({
      query: (data) => ({
        url: `TeamMember/AddUpdateTeamMember?Code=${Code}`,
        method: "POST",
        body: data,
      }),
    }),

    // DELETE Mutation
    deleteTeamMember: builder.mutation({
      query: (id) => ({
        url: `TeamMember/DeleteTeamMember?Code=${Code}&Id=${id}&actionPerformedBy=summer%40yopmail.com`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetTeamMembersQuery,
  useUpdateTeamMemberMutation,
  useCreateTeamMemberMutation,
  useDeleteTeamMemberMutation,
} = api;


